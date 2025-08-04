import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import OrderPage from "./pages/OrderPage/OrderPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LastProfilePage from "./pages/LastProfilePage/LastProfilePage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/uniquecode/:id" element={<ProfilePage />} />
        <Route path="/uniquecode-last/:id" element={<LastProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Provider>
  );
};

export default App;
