export function EventLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-[60vh] bg-gradient-to-br from-gray-800 to-black animate-pulse" />
      
      <div className="max-w-6xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
          </div>
          <div className="lg:col-span-1">
            <div className="h-[400px] bg-white/5 rounded-2xl animate-pulse sticky top-24" />
          </div>
        </div>
      </div>
    </div>
  );
}