import { NavBar } from "./components/nav-bar";
import { Route, Routes } from "react-router";
import { AuthPage } from "./pages/auth/page/auth-page";
import { ProtectedRoute } from "./components/routes/route-protecter";
import "./App.css";
import { MainPage } from "./pages/main/components/main-page";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavBar />
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
