import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.png";

const ImageSlider = () => {
    return (
        <Swiper
            className="w-full"
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
        >
            <SwiperSlide>
                <img src={home1} alt="Nature" className="h-full w-full rounded-2xl object-cover"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={home2} alt="Ocean" className="h-full w-full rounded-2xl object-cover"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={home3} alt="Mountain" className="h-full w-full rounded-2xl object-cover"/>
            </SwiperSlide>
        </Swiper>
    );
};

export default ImageSlider;
