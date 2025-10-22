'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const ProductDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!description) {
    return null
  }

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
      >
        <h2 className="text-xl font-bold text-white">Descripción del Producto</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-brand-yellow" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-yellow" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 py-6">
          <div
            className="prose prose-invert max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-brand-yellow prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-ul:text-white/80 prose-ol:text-white/80
              prose-li:text-white/80
              prose-img:rounded-lg prose-img:shadow-lg
            "
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  )
}

export default ProductDescription
