export default function AuthLayout({ children }) {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center p-8 sm:p-20">
      <main className="bg-gray-900 rounded-lg shadow-lg">{children}</main>
    </div>
  );
}
