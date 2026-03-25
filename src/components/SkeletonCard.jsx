function SkeletonCard() {
  return (
    <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-surface-container-high"></div>
      <div className="p-6 space-y-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-surface-container-high rounded-full"></div>
          ))}
        </div>
        <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
        <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
        <div className="pt-4 flex items-center justify-between border-t border-outline-variant/10">
          <div className="h-6 bg-surface-container-high rounded w-1/4"></div>
          <div className="w-10 h-10 bg-surface-container-high rounded-lg font-bold"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
