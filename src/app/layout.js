import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DropdownMenu from "@/components/dropdown";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="wrap min-h-screen">
          <DropdownMenu
            label="Menu"
            items={[
              { label: "Feed", href: "/feed" },
              { label: "Profile", href: "/profile" },
              { label: "settings", href: "/settings" },
            ]}
          />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
