// src/components/Layout.tsx - Enhanced Version (nur mit vorhandenen Komponenten)
import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Brain, 
  Menu, 
  X,
  Wifi,
  WifiOff,
  Clock
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const location = useLocation();

  // Online/Offline Status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Current Time Update
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/teams", label: "Teams", icon: Users },
    { to: "/games", label: "Games", icon: Calendar },
    { to: "/stats", label: "Stats", icon: BarChart3 },
    { to: "/predictions", label: "Predictions", icon: Brain },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path.startsWith("/teams/")) return "Team Details";
    return navigationItems.find(item => item.to === path)?.label || "NFL Analytics";
  };

  const ConnectionStatus = () => (
    <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
      isOnline 
        ? 'bg-green-900/40 text-green-400' 
        : 'bg-red-900/40 text-red-400'
    }`}>
      {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
      <span>{isOnline ? 'Live' : 'Offline'}</span>
    </div>
  );

  const LiveClock = () => (
    <div className="flex items-center space-x-1 text-xs text-slate-400">
      <Clock size={12} />
      <span>{currentTime.toLocaleTimeString()}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/teams/nfl.png" 
                  alt="NFL" 
                  className="h-8 w-8 object-contain transition-transform group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
              </div>
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                  NFL Analytics
                </span>
                <div className="text-xs text-slate-400">2025/26 Season</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-slate-700 text-white shadow-lg" 
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Status & Mobile Menu */}
            <div className="flex items-center space-x-3">
              
              {/* Desktop Status */}
              <div className="hidden lg:flex items-center space-x-3">
                <LiveClock />
                <ConnectionStatus />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800 animate-in slide-in-from-top-2 duration-200">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive 
                          ? "bg-slate-700 text-white" 
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
              
              {/* Mobile Status */}
              <div className="flex items-center justify-between px-4 py-3 mt-4 pt-4 border-t border-slate-800">
                <LiveClock />
                <ConnectionStatus />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Title Bar - nur auf kleineren Screens */}
      <div className="md:hidden bg-slate-800/50 px-4 py-3 border-b border-slate-700">
        <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Offline Banner */}
        {!isOnline && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-lg">
            <div className="flex items-center space-x-2 text-red-400">
              <WifiOff size={20} />
              <span className="font-medium">You're currently offline</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              Some features may be limited. Data shown may not be current.
            </p>
          </div>
        )}

        {/* Page Content */}
        <div className="animate-in fade-in-50 duration-300">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/teams/nfl.png" alt="NFL" className="h-6 w-6 object-contain" />
                <span className="font-bold text-lg">NFL Analytics</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Your ultimate destination for NFL insights, predictions, and statistics. 
                Powered by advanced AI and real-time data from the 2025/26 season.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-semibold text-white mb-3">Season Info</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>2025/26 NFL Season</li>
                <li>Playoff Games Live</li>
                <li>32 Teams Tracked</li>
                <li>AI Predictions Active</li>
                <li>Real-time Updates</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 NFL Analytics. Data provided by ESPN API.
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Powered by AI</span>
              <span>•</span>
              <ConnectionStatus />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}