import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [signError, setSignInError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignInError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn(email, password);
      console.log("User Logged In:", result.user);
      setSuccess("Login successful! Redirecting...");
      
      setTimeout(() => navigate("/"), 1200); 
    } catch (error) {
      console.error(error);
      setSignInError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
       <Helmet>
                  <title>Travellette | LOgIn</title>
                  </Helmet>
      <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Please Login </h2>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="form-control">
            <label className="label text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-green-800"
              required
            />
          </div>
          
          <div className="form-control mt-2 relative">
            <label className="label text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full text-green-800"
              required
            />
            <span
              className="absolute right-3 top-12 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          {signError && <p className="text-red-500 text-sm mt-2">{signError}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

          <div className="form-control mt-4">
            <button className="btn btn-success w-full text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          New to this website?{" "}
          <a href="/register" className="text-green-600 font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
