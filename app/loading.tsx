export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search box skeleton */}
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <div className="w-5 h-5 bg-gray-700 rounded-full animate-pulse" />
          </div>
          <div className="h-12 w-full bg-gray-800 rounded-xl pl-12 animate-pulse" />
        </div>
      </div>
      {/* Product skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="relative glass-card p-4 animate-pulse">
            <div className="absolute inset-0 gradient-overlay rounded-2xl opacity-30" />

            <div className="relative w-full h-48 mb-4 bg-skeleton rounded-xl"></div>

            <div className="h-4 w-3/4 bg-skeleton rounded mb-2"></div>
            <div className="h-3 w-full bg-skeleton rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
