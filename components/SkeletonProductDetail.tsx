export default function SkeletonProductDetail() {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image skeleton */}
        <div className="relative w-full h-96 md:h-[32rem] glass-card rounded-2xl bg-gray-700" />

        {/* Info skeleton */}
        <div className="space-y-6">
          <div className="h-8 w-2/3 bg-gray-700 rounded gradient-shimmer" />
          <div className="h-4 w-full bg-gray-700 rounded gradient-shimmer" />
          <div className="h-4 w-5/6 bg-gray-700 rounded gradient-shimmer" />

          <div className="h-6 w-1/4 bg-gray-700 rounded gradient-shimmer mt-4" />

          <div className="mt-6 h-12 w-48 bg-gray-700 rounded-full" />

          <div className="border-t border-white/10 pt-6 space-y-2">
            <div className="h-4 w-1/3 bg-gray-700 rounded gradient-shimmer" />
            <div className="h-4 w-1/4 bg-gray-700 rounded gradient-shimmer" />
            <div className="h-4 w-1/5 bg-gray-700 rounded gradient-shimmer" />
          </div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mt-12 p-6 glass-card">
        <div className="h-6 w-1/3 bg-gray-700 rounded mb-4 gradient-shimmer" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-700 rounded gradient-shimmer" />
          <div className="h-4 w-5/6 bg-gray-700 rounded gradient-shimmer" />
          <div className="h-4 w-3/4 bg-gray-700 rounded gradient-shimmer" />
          <div className="h-4 w-2/3 bg-gray-700 rounded gradient-shimmer" />
        </div>
      </div>
    </div>
  );
}
