import { NavBar } from "./components/nav-bar";
import { Route, Routes } from "react-router";
import { AuthPage } from "./pages/auth/page/auth-page";
import { ProtectedRoute } from "./components/routes/route-protecter";
import "./App.css";
import { MainPage } from "./pages/main/pages/main-page";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavBar />
        <div className="flex-grow h-[90vh] max-h-[90vh] overflow-auto">
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
      </div>
    </>
  );
}

export default App;
