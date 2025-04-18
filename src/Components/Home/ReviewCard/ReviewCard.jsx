const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition transform hover:scale-105 duration-300">
      {/* Image with gradient overlay */}
      <div className="relative w-full h-48">
        <img
          src={review.image}
          alt={review.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 rounded-lg"></div>
      </div>

      {/* Review Content */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{review.name}</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
