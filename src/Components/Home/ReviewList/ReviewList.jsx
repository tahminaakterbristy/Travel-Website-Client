



import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://my-server-black.vercel.app/travelExperiences")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-50 py-16 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <Fade>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600">
            Share your travel experience with us and inspire others!
          </p>
        </Fade>
      </div>

      {/* Swiper Section */}
      <div className="max-w-5xl mx-auto">
        <Swiper
          modules={[Pagination, Navigation , Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{review.review}</p>
                <p className="mt-2 text-sm text-gray-500 font-bold">Sharing Date: <span className="text-black font-bold">{review.date}</span> </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Share Experience Button */}
      <div className="text-center mt-8">
        <Link to="/share-experience">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition">
            Share Your Experience
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewList;
