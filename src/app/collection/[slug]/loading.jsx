import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-brand-yellow animate-spin mx-auto" />
        <p className="text-white/60">Cargando colección...</p>
      </div>
    </div>
  )
}
