import React from 'react';
import Link from 'next/link';
import {
  Category,
  Diagram,
  Cards,
  BoxTick,
  Bag2,
  People,
  Setting2,
} from 'iconsax-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: Category },
    { label: 'Cattle & Kircha', href: '/admin/kircha', icon: Diagram },
    { label: 'Reservations', href: '/admin/reservations', icon: Cards },
    { label: 'Pickup Desk', href: '/admin/pickup', icon: BoxTick },
    { label: 'Farm Shop', href: '/admin/shop', icon: Bag2 },
    { label: 'Customers', href: '/admin/customers', icon: People },
    { label: 'Settings', href: '/admin/settings', icon: Setting2 },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-200 flex flex-col shrink-0 border-r border-stone-800">
        <div className="p-5 border-b border-stone-800">
          <h1 className="font-extrabold text-base text-white tracking-wide">
            Digital Kircha
          </h1>
          <p className="text-xs text-stone-400">Admin Operations Desk</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
              >
                <Icon size={18} color="#74a156" variant="Linear" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800 text-xs text-stone-400">
          <span>Location: Ambo, Ethiopia</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between">
          <h2 className="font-bold text-stone-800 text-sm">
            Operations Portal
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-stone-600">
              Live Gateway Connected
            </span>
          </div>
        </header>
        <div className="p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
