import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import useAuth from "../hooks/useAuth";
import { updateProfileImage } from "../api/auth.api";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="text-center mt-10">
          Please login to view profile.
        </div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image before upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    uploadImage(file);
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await updateProfileImage(formData);

      // Update AuthContext instantly
      setUser((prev) => ({
        ...prev,
        profileImage: res.data.profileImage,
      }));

      setPreview(null);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-xl p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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

            <label className="btn btn-sm btn-outline mt-3">
              {loading ? "Uploading..." : "Change Photo"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
