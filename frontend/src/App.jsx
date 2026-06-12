import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/layout/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
// import MarketplacePage from "./pages/MarketplacePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AddPostPage from "./pages/AddPostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Import Guards
import GuestGuard from "./components/guards/GuestGuard.jsx";
import AuthGuard from "./components/guards/AuthGuard.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* 🟢 Public Routes (Ay 7d yshofha) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<div>صفحة المنشورات (قريباً)</div>} />

            {/* 🟡 Guest Routes (L-ly msh 3aml login bs) */}
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <LoginPage />
                </GuestGuard>
              }
            />
            <Route
              path="/register"
              element={
                <GuestGuard>
                  <RegisterPage />
                </GuestGuard>
              }
            />

            {/* 🔴 Auth Routes (L-ly 3aml login bs) */}
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />
            <Route
              path="/add-post"
              element={
                <AuthGuard>
                  <AddPostPage />
                </AuthGuard>
              }
            />

            {/* 👑 Admin Routes (Ll-moderen bs) */}
            {/* <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} /> */}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2500} theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
