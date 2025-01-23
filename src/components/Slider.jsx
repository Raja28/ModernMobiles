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

export const Slider = () => {
  return (
    <div className="mt-4 container container slider-wrapper">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        dynamicHeight={true}
        interval={2000}
        showArrows={true}
        className="border border-1"
      >
        {imgArr.map((img) => (
          <div key={img} style={{ height: "80%" }}>
            <img
              src={img}
              key={img}
              alt="img-banner"
              style={{ height: "90%", width: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
