export function MenuOptions() {
  const items = [
    { label: "Calendar", href: "/calendar" },
    { label: "Notes", href: "/notes" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Sign Out", action: "logout" },
  ];

  const mainItems = (items ?? []).filter((i) =>
    ["/calendar", "/notes"].includes(i.href),
  );

  const profileNsettings = (items ?? []).filter((i) =>
    ["/profile", "/settings"].includes(i.href),
  );

  const logoutItem = (items ?? []).find((i) => i.action === "logout");

  return { mainItems, profileNsettings, logoutItem };
}

export function MenuItem({ item, pathname, setIsOpen }) {
  const isActive = item.href && pathname === item.href;

  return (
    <li>
      <a
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={`block px-6 py-3 rounded-lg transition-all ${
          isActive
            ? "bg-blue-500 text-white font-semibold border-l-4 border-blue-700"
            : "text-black hover:bg-gray-200"
        }`}
      >
        {item.label}
      </a>
    </li>
  );
}

export function MenuGroup({ title, items, pathname, setIsOpen }) {
  return (
    <div>
      <div className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
        {title}
      </div>

      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            pathname={pathname}
            setIsOpen={setIsOpen}
          />
        ))}
      </ul>
    </div>
  );
}
