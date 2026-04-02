import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.js";
import { logoutUser } from "../../API/auth.api.js";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full px-6 py-3 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 🔷 Logo */}
        <Link to="/" className="flex items-center gap-3 group">
           <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-[2px] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="MetaSearch Logo" 
                className="w-7 h-7 object-contain"
              />
            </div>
          </div>

          <span className="text-xl font-bold text-white tracking-wide group-hover:text-indigo-400 transition">
            OMNISEEK
          </span>
        </Link>

        {/* 🔷 Right Section */}
        {!loading && (
          <div className="flex items-center gap-4">
            
            {user ? (
              <>
                {/* History */}
                <Link
                  to="/history"
                  className="text-slate-300 hover:text-white transition"
                >
                  History
                </Link>

                {/* Profile */}
                <div className="relative group">
                  
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition">
                    <img
                      src={
                        user.profileImage
                          ? `${user.profileImage}?t=${Date.now()}`
                          : `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-t-xl"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/history"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      History
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;