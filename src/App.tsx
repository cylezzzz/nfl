import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LiveDashboard from "./pages/LiveDashboard";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Games from "./pages/Games";
import Stats from "./pages/Stats";
import Predictions from "./pages/Predictions";

export default function App() {
  return (
    <Routes>
      {/* Default Dashboard mit Mock Data für Playoffs */}
      <Route path="/" element={<Dashboard />} />
      
      {/* Live Dashboard mit echten ESPN API Daten */}
      <Route path="/live" element={<LiveDashboard />} />
      
      {/* Teams Sektion */}
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamDetail />} />
      
      {/* Games Sektion */}
      <Route path="/games" element={<Games />} />
      
      {/* Statistics */}
      <Route path="/stats" element={<Stats />} />
      
      {/* AI Predictions */}
      <Route path="/predictions" element={<Predictions />} />
      
      {/* Fallback für unbekannte Routen */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}