import React from "react";
import OrderPage from "./pages/OrderPage/OrderPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SecondProfilePage from "./pages/SecoundProfilePage/SecondProfilePage";
import LastProfilePage from "./pages/LastProfilePage/LastProfilePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/order" element={<OrderPage />} />
      <Route path="/" element={<ProfilePage />} />
      <Route path="/uniquecode/:id" element={<SecondProfilePage />} />
      <Route path="/uniquecode-last/:id" element={<LastProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
