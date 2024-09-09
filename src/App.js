import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { Dashboard } from "./screens/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/roomsDashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
