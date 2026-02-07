import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { logoutUser } from "../../api/auth.api";



const Navbar = () => {
  const { user,setUser } = useAuth();



  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          MetaSearch
        </Link>
      </div>

      <div className="flex gap-3">
        {user ? (
            <>
            <Link to="/profile" className="btn btn-ghost">
      Profile
    </Link>
    <button onClick={handleLogout} className="btn btn-error">
      Logout
    </button></>
          
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
    </div>
  );
};

export default Navbar;
