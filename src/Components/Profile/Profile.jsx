import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";


const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Profile Update
  const handleUpdate = () => {
    updateProfile(user, {
      displayName: formData.name,
      photoURL: formData.photoURL,
    })
      .then(() => {
        setUser({ ...user, displayName: formData.name, photoURL: formData.photoURL });
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-white rounded-lg shadow-2xl">
       <Helmet>
                  <title>Travellette | MyProfile</title>
                  </Helmet>
      <h2 className="text-xl font-semibold text-center mb-4">Update Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded text-green-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Profile Picture URL</label>
        <input
          type="text"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          className="w-full p-2 border rounded text-green-700"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
