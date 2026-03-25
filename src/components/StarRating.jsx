function StarRating({ rating, count }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>
            {i < fullStars ? 'star' : (i === fullStars && hasHalf ? 'star_half' : 'star_outline')}
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[0.625rem] text-outline font-bold tracking-widest">({count})</span>
      )}
    </div>
  )
}

export default StarRating
