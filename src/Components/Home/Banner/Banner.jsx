

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import image from '../../../assets/amjad-rana-MrKPi-yajC0-unsplash.jpg';
import image2 from '../../../assets/cityscape-singapore-city-skyline.jpg';
import image3 from '../../../assets/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

const Banner = () => {
  return (
    <div className="banner-container bg-gray-100">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[600px]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src={image}
              alt="Beach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center px-8">
              <h1 className="text-5xl font-extrabold mb-6">
                Discover Paradise
              </h1>
              <p className="text-lg max-w-xl">
                Explore pristine beaches and crystal-clear waters with our
                exclusive travel packages.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src={image2}
              alt="Mountains"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center px-8">
              <h1 className="text-5xl font-extrabold mb-6">
                Adventure Awaits
              </h1>
              <p className="text-lg max-w-xl">
                Embark on a journey to breathtaking mountain vistas and trails.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src={image3}
              alt="Cityscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center px-8">
              <h1 className="text-5xl font-extrabold mb-6">Urban Escapes</h1>
              <p className="text-lg max-w-xl">
                Dive into the vibrant culture and exciting nightlife of the
                world’s top cities.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
