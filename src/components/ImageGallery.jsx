import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const MyGallery = ({ images }) => {
    if (!images) {
        return;
    }
    return <ImageGallery items={images}
        thumbnailPosition={"left"}
        showPlayButton={false}
    />;

}