import React from "react";
import OrderPage from "./pages/OrderPage/OrderPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SecondProfilePage from "./pages/SecondProfilePage/SecondProfilePage";
import SecondProfilePage2 from "./pages/SecondProfilePage2/SecondProfilePage2";
import SecondProfilePage3 from "./pages/SecondProfilePage3/SecondProfilePage3";
import SecondProfilePage4 from "./pages/SecondProfilePage4/SecondProfilePage4";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/order" element={<OrderPage />} />
      <Route path="/" element={<ProfilePage />} />
      <Route path="/uniquecode/:id" element={<SecondProfilePage />} />
      <Route path="/uniquecode2/:id" element={<SecondProfilePage2 />} />
      <Route path="/uniquecode3/:id" element={<SecondProfilePage3 />} />
      <Route path="/uniquecode4/:id" element={<SecondProfilePage4 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
