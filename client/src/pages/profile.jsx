import Navbar from "../components/layout/Navbar";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-xl p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
