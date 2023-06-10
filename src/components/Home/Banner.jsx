/* eslint-disable react/no-unescaped-entities */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";

import Lottie from "lottie-react";
import photographySlider1 from "../../assets/photography-slider-1.json";
import photographySlider2 from "../../assets/photography-slider-2.json";
import photographySlider3 from "../../assets/photography-slider-3.json";

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col-reverse lg:flex-row justify-around items-center min-h-[85vh]">
            <div className="w-full lg:w-1/3 text-center p-3 lg:text-left">
              <h1 className="text-4xl font-bold text-primary mb-3">
                Capture the Beauty of Summer: Join Our Photography Camp!
              </h1>
              <p>
                Discover the wonders of summer through the lens of your camera.
                Our Photography Camp offers a unique opportunity to enhance your
                skills, explore breathtaking landscapes, and create lasting
                memories. Unleash your creativity and join us for an
                unforgettable summer adventure!
              </p>
            </div>
            <div className="lg:w-1/3">
              <Lottie animationData={photographySlider1}></Lottie>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col-reverse lg:flex-row justify-around items-center min-h-[85vh]">
            <div className="w-full lg:w-1/3 text-center p-3 lg:text-left">
              <h1 className="text-4xl font-bold text-primary mb-3">
                Capture the Beauty of Summer: Join Our Photography Camp!
              </h1>
              <p>
                Discover the wonders of summer through the lens of your camera.
                Our Photography Camp offers a unique opportunity to enhance your
                skills, explore breathtaking landscapes, and create lasting
                memories. Unleash your creativity and join us for an
                unforgettable summer adventure!
              </p>
            </div>
            <div className="lg:w-1/3">
              <Lottie animationData={photographySlider2}></Lottie>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col-reverse lg:flex-row justify-around items-center min-h-[85vh]">
            <div className="w-full lg:w-1/3 text-center p-3 lg:text-left">
              <h1 className="text-4xl font-bold text-primary mb-3">
                Immerse Yourself in the Colors of Summer: Enroll in Our
                Photography Camp Now!
              </h1>
              <p>
                Step into a world of vibrant colors, stunning landscapes, and
                beautiful sunsets. Our Summer Photography Camp is designed to
                help you capture the essence of summer through your lens. Join
                us for hands-on workshops, personalized feedback, and exciting
                photo challenges. Embrace the season and embark on a journey to
                develop your photography skills like never before!
              </p>
            </div>
            <div className="lg:w-1/3">
              <Lottie animationData={photographySlider3}></Lottie>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
