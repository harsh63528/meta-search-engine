import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { logoutUser } from "../../api/auth.api.js";

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
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
      
      {/* Logo */}
      <div className="avatar">
        <div className=" glass w-10 rounded-full  text-primary-content flex items-center justify-center font-bold text-lg">
          <img src="/src/assets/logo.png" alt="OmniSeek Logo" />
        </div>
      </div>

      {/* Website Name */}
      <span className="text-2xl font-bold text-primary">
        MetaSearch
      </span>

    </Link>

      </div>

      {/* Prevent flashing before auth loads */}
      {!loading && (
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* History Button */}
              <Link to="/history" className="btn btn-ghost">
                History
              </Link>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={
                        user.profileImage
                          ? `${user.profileImage}?t=${Date.now()}`
                          : `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt="profile"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/history">History</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
