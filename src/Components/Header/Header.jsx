
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import { Switch,  Typography } from "@mui/material";



const Header = () => {
  const {user, logOut} = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const handleSignOut = () =>{
    logOut()
    .then(() =>{})
    .catch()

  }
    const navLinks =     <>
    <li><NavLink to="/" className="hover:text-green-600">Home</NavLink></li>
    <li><NavLink to="/AllSpot" className="hover:text-green-600">All Tourist Spot</NavLink></li>
    <li><NavLink to="/Mylist" className="hover:text-green-600">My List</NavLink></li>
    {/* {!user && (
    <li><NavLink to="/Login" className="hover:text-green-600">Log In</NavLink></li>
  )} */}
  
  {user && (
    <li><NavLink to="/my-profile" className="hover:text-green-600">My Profile</NavLink></li>
  )}
</>;
  
  
    
   {/* {user?.email? <li><button onClick={handleSignOut}>Sign Out</button></li>
   : <li><Link to='/login'>Login</Link></li>} */}
    
    
    
    return (
        
   <div className={`navbar ${darkMode ? "bg-gray-900 text-white" : "bg-green-300 text-gray-900"} px-5 md:px-10`}>
      
            {/* Mobile Menu Button */}
            <div className="dropdown">
        <label tabIndex={0} className="btn btn-square btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        {/* Mobile Fullscreen Dropdown */}
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 absolute z-[50] p-4 shadow-lg bg-white text-gray-900 rounded-lg w-60"
        >
          {navLinks}
          {/* Dark Mode Toggle in Mobile */}
          <li className="flex justify-between items-center">
            <span className="text-sm">Dark Mode</span>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </li>
          {/* User Info & Logout (Only if Logged In) */}
          {user ? (
            <div className="flex flex-col items-center mt-3">
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full border-2 border-green-600"
                alt="User"
              />
              <p className="text-sm font-medium mt-1">{user.displayName}</p>
              <button
                onClick={handleSignOut}
                className="btn btn-sm bg-gradient-to-r from-green-500 to-green-700 mt-2 border-none text-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-outline btn-success w-full mt-2">Log In</button>
            </Link>
          )}
        </ul>
      </div>

      

  {/* Logo */}
  <div className="flex-1">
        <p className="btn btn-ghost normal-case text-2xl font-bold text-green-600">Travellette</p>
      </div>

{/* Center - Navbar Links */}
<div className="hidden lg:flex w-full justify-center">
  <ul className="menu menu-horizontal px-1 space-x-4">
    {navLinks}
  </ul>
   {/* Dark Mode Toggle */}
 <div className="flex items-center gap-2">
 <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
   🌙
   <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
 </Typography>
 </div>



        
 

 {user ? (
  <div className="flex items-center ml-28 gap-4">
    <img
      src={user.photoURL}
      className="w-10 h-10 rounded-full border-2 border-green-600"
      alt="User"
    />
    {/* User Profile Info */}
    <div className="hidden sm:flex flex-row-reverse items-center gap-7">

    <button
        onClick={handleSignOut}
        className=" btn bg-gradient-to-r from-green-500 to-green-700  border-none text-sm text-white cursor-pointer hover:underline mr-9"
      >
        Sign Out
      </button>
      <p className="text-sm font-medium">{user.displayName}</p>
     
    </div>
  </div>
) : (
  <Link to="/login">
    <button className="btn btn-outline btn-success">Log In</button>
  </Link>
)}
</div>
 
</div>
    
  );
};

export default Header;