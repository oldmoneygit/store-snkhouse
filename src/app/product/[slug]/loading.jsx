export default function Loading() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-24">
        {/* Skeleton Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            <div className="h-10 bg-white/5 rounded-lg animate-pulse w-3/4" />
            <div className="h-32 bg-white/5 rounded-lg animate-pulse w-full max-w-md" />
            <div className="h-16 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-24 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-20 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-14 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
