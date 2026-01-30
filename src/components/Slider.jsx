import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ".././App.css";

const imgArr2 = [
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975353/ModernMobiles/Banner%20Images/placeholderBanner_1741323019_605_xmjrej.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975328/ModernMobiles/Banner%20Images/placeholderBanner_1740724949_612_iomeae.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975303/ModernMobiles/Banner%20Images/placeholderBanner_1741852480_601_ejojud.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975283/ModernMobiles/Banner%20Images/placeholderBanner_1741852702_619_uhtxwd.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975270/ModernMobiles/Banner%20Images/placeholderBanner_1741855501_616_nsgif0.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975254/ModernMobiles/Banner%20Images/placeholderBanner_1741265454_547_gjery1.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975686/ModernMobiles/Banner%20Images/placeholderBanner_1737962286_591_nafqln.jpg",
  "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975699/ModernMobiles/Banner%20Images/placeholderBanner_1736762155_584_ruv8oo.jpg",
];

export const Slider = () => {
  return (
    <div className="slider-container container py-3">
      <Carousel
        autoPlay={true}
        showStatus={false} // Removes the "1 of 8" text
        showThumbs={false}
        infiniteLoop={true}
        interval={4000} // Slightly longer for better readability
        showArrows={true}
        stopOnHover={true}
        emulateTouch={true} // Better for mobile users
        swipeable={true}
        className="modern-carousel shadow-sm"
      >
        {imgArr2.map((img, index) => (
          <div key={index} className="slider-item">
            <img
              src={img}
              alt={`Promotion Banner ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};


// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import ".././App.css";

// const imgArr2 = [
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975353/ModernMobiles/Banner%20Images/placeholderBanner_1741323019_605_xmjrej.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975328/ModernMobiles/Banner%20Images/placeholderBanner_1740724949_612_iomeae.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975303/ModernMobiles/Banner%20Images/placeholderBanner_1741852480_601_ejojud.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975283/ModernMobiles/Banner%20Images/placeholderBanner_1741852702_619_uhtxwd.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975270/ModernMobiles/Banner%20Images/placeholderBanner_1741855501_616_nsgif0.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975254/ModernMobiles/Banner%20Images/placeholderBanner_1741265454_547_gjery1.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975686/ModernMobiles/Banner%20Images/placeholderBanner_1737962286_591_nafqln.jpg",
//   "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741975699/ModernMobiles/Banner%20Images/placeholderBanner_1736762155_584_ruv8oo.jpg",
// ]

// export const Slider = () => {
//   return (
//     <div className="mt-4  slider-wrapper container">
//       <Carousel
//         autoPlay={true}
//         showThumbs={false}
//         infiniteLoop={true}
//         dynamicHeight={true}
//         interval={3000}
//         showArrows={true}
//         className="border border-danger"
      
//       >
//         {imgArr2.map((img) => (
//           <div key={img} style={{ height: "100%" }}>
//             <img
//               src={img}
//               key={img}
//               alt="img-banner"
//               style={{ height: "100%", width: "100%", objectFit: "cover" }}
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };
