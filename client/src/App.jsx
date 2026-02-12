import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/profile.jsx";
import History from "./pages/History.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
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
