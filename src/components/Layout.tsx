// src/components/Layout.tsx
import { Link, NavLink } from "react-router-dom";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="/teams/nfl.png" alt="NFL" className="h-6 w-6 object-contain" />
            <span>NFL Analytics</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2 text-sm">
            {[
              { to: "/", label: "Dashboard" },
              { to: "/teams", label: "Teams" },
              { to: "/games", label: "Games" },
              { to: "/stats", label: "Stats" },
              { to: "/predictions", label: "Predictions" },
            ].map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md ${isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800"}`
                }
              >
                {i.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
