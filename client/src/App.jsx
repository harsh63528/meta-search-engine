import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import History from "./pages/History";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";


function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> }/>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Results />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={ <ProtectedRoute> <History /> </ProtectedRoute> }/>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
