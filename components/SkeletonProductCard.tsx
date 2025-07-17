export default function SkeletonProductCard() {
  return (
    <div className="glass-card p-4 animate-pulse flex flex-col justify-between min-h-[32rem] h-full">
      <div className="bg-gray-700/40 rounded-xl w-full h-48 mb-4" />
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-gray-700/40 rounded w-3/4" />
        <div className="h-4 bg-gray-700/30 rounded w-1/2" />
        <div className="h-4 bg-gray-700/30 rounded w-2/3" />
        <div className="h-4 bg-gray-700/30 rounded w-1/3" />
      </div>
      <div className="mt-auto">
        <div className="h-10 bg-gray-700/40 rounded-full w-full" />
      </div>
    </div>
  );
}
