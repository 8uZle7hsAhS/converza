import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import OtpPage from './components/OtpPage';
import { useAuthStore } from './auth/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="p-4 ">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </div>
  );
};

export default App;
