import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import {  useLoaderData, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const AddTouristsSpot = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const spot = useLoaderData();
  const { country_name, tourists_spot_name, average_cost } = spot;

  // State to manage form data
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    touristspot: tourists_spot_name,
    country: country_name,
    cost: average_cost,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// handle submit and toast+redirect
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const saveData = {
      customerName: formData.name,
      email: formData.email,
      tourists_spot_name: formData.touristspot,
      country_name: formData.country,
      average_cost: formData.cost,
    };
  
    try {
      const response = await fetch("https://my-server-black.vercel.app/saveSpotData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      // ✅ SweetAlert and redirect
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Tourist spot added successfully!",
        confirmButtonColor: "#22c55e",
      }).then(() => {
      navigate("/Mylist"); 
      });
  
    } catch (error) {
      console.error("Error during fetch:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while adding the tourist spot.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
       <Helmet>
                        <title>Travellette | Add Spot</title>
                        </Helmet>
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Add {tourists_spot_name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border text-green-800 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border text-green-800 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Tourist Spot Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tourist Spot
            </label>
            <input
              type="text"
              name="touristspot"
              value={formData.touristspot}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border text-green-800 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Country Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border text-green-800 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Average Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Cost ($)
            </label>
            <input
              type="text"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border text-green-800 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Add Tourist Spot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTouristsSpot;
