"use client";

import DropdownMenu from "@components/dropdown";

export default function Home() {
  const menuItems = [
    { label: "Feed", href: "/feed" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="p-8">
      <DropdownMenu label="Menu" items={menuItems} />
    </div>
  );
}
