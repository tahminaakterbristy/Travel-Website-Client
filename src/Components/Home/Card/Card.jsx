import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = () => {
  const [cards, setCards] = useState([]); 

  useEffect(() => {
    fetch("https://my-server-black.vercel.app/countriedcard") 
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* সেকশন হেডিং */}
      <h1 className="text-4xl font-bold text-center text-green-800 mb-10">
        🌍 Top Tourist Destinations
      </h1>

      {/* কার্ড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.slice(0, 6).map((card) => (
          <div
            key={card._id}
            className="relative rounded-lg overflow-hidden shadow-lg group transform hover:scale-105 transition duration-300"
          >
            {/* ব্যাকগ্রাউন্ড ইমেজ */}
            <img
              src={card.image}
              alt={card.tourists_spot_name}
              className="w-full h-64 object-cover"
            />

            
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-2xl font-bold">
                {card.tourists_spot_name}
              </h2>
              <p className="text-gray-300 text-sm">📍 {card.country_name}</p>
              <Link
                to={`/spot/${card._id}`}
                className="mt-3 inline-block px-4 py-2 bg-green text-black rounded-md font-semibold shadow-md hover:bg-gray-300 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center mt-8">
        <Link
          to="/AllSpot"
          className="px-6 py-3 bg-green-400 text-white font-semibold text-lg rounded-md shadow-lg hover:bg-green-800 transition"
        >
          See More Destinations
        </Link>
      </div>
    </div>
  );
};

export default Card;
