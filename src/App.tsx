import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Games from "./pages/Games";
import Stats from "./pages/Stats";
import Predictions from "./pages/Predictions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:id" element={<TeamDetail />} />
      <Route path="/games" element={<Games />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/predictions" element={<Predictions />} />
    </Routes>
  );
}
