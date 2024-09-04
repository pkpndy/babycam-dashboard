import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { Dashboard } from "./screens/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
