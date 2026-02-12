import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import { loginUser } from "../API/auth.api.js";
import useAuth from "../Hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser(form);
      await fetchUser();
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      setError(errorMsg);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">
        <div className="card w-96 bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {error && (
            <div className="alert alert-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
