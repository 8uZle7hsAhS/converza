import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import OtpPage from './components/OtpPage';

const App = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </div>
  );
};

export default App;
