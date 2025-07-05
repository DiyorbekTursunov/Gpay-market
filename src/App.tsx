import React from "react";
import OrderPage from "./pages/OrderPage/OrderPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/order" element={<OrderPage />} />
      <Route path="/" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
