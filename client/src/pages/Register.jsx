import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import { registerUser } from "../API/auth.api.js";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Registration failed";
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
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          {error && (
            <div className="alert alert-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

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
              {loading ? "Loading..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
