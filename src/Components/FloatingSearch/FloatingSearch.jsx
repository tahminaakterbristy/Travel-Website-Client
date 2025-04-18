import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const FloatingSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showText, setShowText] = useState(false);

  // Fetch Data from API
  useEffect(() => {
    if (query.trim().length > 0) {
      fetch(`https://my-server-black.vercel.app/countriedcard?search=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  }, [query]);

  // 🔁 Toggle Text Effect (Show "Search a place" every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 2000); // Every 2 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Search Button with Auto-Toggle Text */}
      <div className="relative flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
        >
          {isOpen ? <X size={22} /> : <Search size={22} />}
        </button>

        {/* Auto-Toggling */}
        {showText && (
          <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md animate-fadeInOut">
            Search a place
          </span>
        )}
      </div>

      {/* Search Box & Results */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-white shadow-lg rounded-lg p-3 w-80">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Tourist Spot..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />

          {/* Matched Results as Cards */}
          {results.length > 0 && (
            <div className="mt-3 max-h-60 overflow-y-auto space-y-3">
              {results.map((spot) => (
                <div
                  key={spot.id || spot._id} // Ensure unique key
                  className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                >
                  <img
                    src={spot.image}
                    alt={spot.tourists_spot_name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{spot.tourists_spot_name}</h3>
                    <p className="text-sm text-gray-600">{spot.country_name}</p>
                    <p className="text-xs text-gray-500">Travel: {spot.travel_time}</p>
                  </div>
                  <Link
                    to={`/spot/${spot._id}`}
                    className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-300 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingSearch;
