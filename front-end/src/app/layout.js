import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Springpad Revived",
  description: "Created with Next.js 13 and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} 
          antialiased `}
        >
          <div className="bg-gray-800 text-white flex items-center justify-center min-h-screen wrap ">
            <main className="bg-gray-900 text-left rounded-lg">
              {children}
            </main>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
