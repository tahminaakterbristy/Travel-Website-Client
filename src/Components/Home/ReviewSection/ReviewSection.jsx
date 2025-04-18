
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";


const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://my-server-black.vercel.app/travel-reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  const duplicatedReviews = reviews.length < 3 ? [...reviews, ...reviews] : reviews;

  return (
    <div className={`py-16 px-6 md:px-12 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <Fade>
          <h2 className="text-4xl font-bold mb-4">🌍 What Our Travelers Say</h2>
          <p className="text-lg">Share your travel experience with us and inspire others!</p>
        </Fade>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        {reviews.length > 0 ? (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop={duplicatedReviews.length > 1}
            className="swiper-container"
          >
            {duplicatedReviews.map((review, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className={`p-8 mx-4 rounded-lg transition transform hover:scale-105 duration-300 ${darkMode ? "bg-gray-800 shadow-lg" : "bg-gray-600 shadow-xl"}`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image || "https://via.placeholder.com/150"}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{review.name}</h3>
                      <p className="text-sm opacity-80">{review.location}</p>
                    </div>
                  </div>
                  <p className="mt-4 leading-relaxed">❝ {review.review} ❞</p>
                  <p className="mt-2 text-sm opacity-70">{review.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center opacity-70">No reviews yet. Be the first to share your experience!</p>
        )}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/share-experience"
          className="py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-white bg-green-600 hover:bg-green-700"
        >
          ✨ Share Your Experience
        </a>
      </div>
    </div>
  );
};

export default ReviewSection;