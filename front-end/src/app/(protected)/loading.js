export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-auto">
      <div className="bg-white p-12 rounded-2xl flex flex-col items-center justify-center gap-4 pb-6 shadow-xl w-1/3 max-w-lg min-h-50">
        <div className="h-16 w-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <span className="text-lg text-black font-semibold text-center">
          Loading...
        </span>
      </div>
    </div>
  );
}
