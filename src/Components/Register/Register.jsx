import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [success, setSucess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log(email, password, name, photo);

    if (password.length < 8) {
      setRegisterError("Password should be at least 8 characters long");
      return;
    }
    setSucess("");
    setRegisterError("");

    // user creation
    createUser(email, password)
      .then((result) => {
        const user = result?.user;
        console.log(user);
        updateProfile(user, { displayName: name, photoURL: photo }).then(() => {
          setUser((currentUser) => {
            currentUser.displayName = name;
            currentUser.photoURL = photo;
          });
          setSucess("User created successfully");
        });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="mx-auto md:w-1/2 mt-8 mb-8 lg:w-1/3 items-center p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
       <Helmet>
                  <title>Travellette | Register</title>
                  </Helmet>
      <h2 className="text-2xl mb-4 text-center text-gray-800 dark:text-white mt-8">Please Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full p-3 text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="email"
          name="email"
          placeholder="Your Email Address"
          required
        />
        <input
          className="w-full p-3  text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="password"
          name="password"
          placeholder="Your Password"
          required
        />
        <input
          className="w-full p-3 text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          className="w-full p-3 text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="text"
          name="photo"
          placeholder="Your Photo URL"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Register
        </button>
      </form>

      {/* Error and Success Messages */}
      {registerError && <p className="text-red-500 mt-4 text-center">{registerError}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

      <div className="text-center mt-4 ">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/Login" className="text-green-800 font-bold hover:underline mb-8">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
