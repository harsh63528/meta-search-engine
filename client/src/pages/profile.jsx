import { useState } from "react";
import Navbar from "../components/layout/Navbar.jsx";
import useAuth from "../Hooks/useAuth.js";
import { updateProfileImage } from "../API/auth.api.js";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="text-center mt-10 text-lg">
          Please login to view profile.
        </div>
      </div>
    );
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔹 Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB");
      return;
    }

    setError("");

    // 🔹 Preview before upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await updateProfileImage(formData);

      // Update AuthContext instantly
      setUser((prev) => ({
        ...prev,
        profileImage: res.data.profileImage,
      }));

      setPreview(null); // remove preview after successful upload

    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-xl p-8 max-w-md mx-auto">

          <h2 className="text-2xl font-bold mb-6 text-center">
            My Profile
          </h2>

          {/* Profile Image Section */}
<div className="flex flex-col items-center mb-6">

  <div className="avatar">
    <div className="w-28 rounded-full ring ring-primary ring-offset-2">
      <img
        src={
          preview ||
          user.profileImage ||
          `https://ui-avatars.com/api/?name=${user.name}`
        }
        alt="Profile"
      />
    </div>
  </div>

  {/* Hidden File Input */}
  <input
    type="file"
    id="profileImageInput"
    accept="image/*"
    className="hidden"
    onChange={handleImageChange}
  />

  {/* Button triggers input manually */}
  <button
    className="btn btn-outline btn-sm mt-4"
    onClick={() =>
      document.getElementById("profileImageInput").click()
    }
    disabled={loading}
  >
    {loading ? "Uploading..." : "Change Photo"}
  </button>

</div>


          {/* User Info */}
          <div className="space-y-3 text-lg">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
