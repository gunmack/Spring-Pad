export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg flex items-center gap-3">
        <div className="h-6 w-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
}
