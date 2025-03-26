import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ".././App.css";


const imgArr = [
  "https://rewardmobile.co.uk/wp-content/uploads/2024/08/Google-Pixel-9-Banners_G-Pixel-9-RM-Shop-Desktop-Preorder-scaled.jpg",
  "https://www.alezay.com/wp-content/uploads/2023/04/MOTOROLA-EDGE-40-PRO-WEBSITE-BANNER-ALEZAY-KUWAIT.jpg",
  "http://tiny.cc/ibanner",
  "http://tiny.cc/zfold",
  "http://tiny.cc/banner-bazzar",
  "https://www.reliancedigital.in/medias/Google-Pixel-Offer-Banner-D-updated.jpg?context=bWFzdGVyfGltYWdlc3wxMDIyNTV8aW1hZ2UvanBlZ3xpbWFnZXMvaDk1L2hkNi8xMDE4MTg1NzI0NzI2Mi5qcGd8ZmVjNzZlMDE3NWFhNjRiZGQ2Yzk1ZTU1MTI0ZjE5NDVjZDFlZTAyNzI2ZGMwOTQ3Mzc1MmMxZjNmOTIxYTczNg",
  "https://oxygendigitalshop.com/media/cache/1920x0/catalog/category/Web_banner_2-04_1_1706090718.webp",
];

const imgArr2 = [
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975353/ModernMobiles/Banner%20Images/placeholderBanner_1741323019_605_xmjrej.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975328/ModernMobiles/Banner%20Images/placeholderBanner_1740724949_612_iomeae.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975303/ModernMobiles/Banner%20Images/placeholderBanner_1741852480_601_ejojud.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975283/ModernMobiles/Banner%20Images/placeholderBanner_1741852702_619_uhtxwd.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975270/ModernMobiles/Banner%20Images/placeholderBanner_1741855501_616_nsgif0.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975254/ModernMobiles/Banner%20Images/placeholderBanner_1741265454_547_gjery1.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975686/ModernMobiles/Banner%20Images/placeholderBanner_1737962286_591_nafqln.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975699/ModernMobiles/Banner%20Images/placeholderBanner_1736762155_584_ruv8oo.jpg",
]

export const Slider = () => {
  return (
    <div className="mt-4  slider-wrapper container">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        dynamicHeight={true}
        interval={3000}
        showArrows={true}
        className="border border-danger"
      
      >
        {imgArr2.map((img) => (
          <div key={img} style={{ height: "100%" }}>
            <img
              src={img}
              key={img}
              alt="img-banner"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
