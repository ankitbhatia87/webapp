import GalleryList from "./list";
// import image from "../../assets/images/gallery/1.jpg";

const imageData = [
  {
    id: "image_1",
    src: "/src/assets/images/gallery/1.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_1.jpg"
  },
  {
    id: "image_2",
    src: "/src/assets/images/gallery/2.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_2.jpg"
  },
  {
    id: "image_3",
    src: "/src/assets/images/gallery/3.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_3.jpg"
  },
  {
    id: "image_4",
    src: "/src/assets/images/gallery/1.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_1.jpg"
  },
  {
    id: "image_5",
    src: "/src/assets/images/gallery/3.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_3.jpg"
  },
  {
    id: "image_6",
    src: "/src/assets/images/gallery/1.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_1.jpg"
  },
  {
    id: "image_7",
    src: "/src/assets/images/gallery/3.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_3.jpg"
  },
  {
    id: "image_8",
    src: "/src/assets/images/gallery/2.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_2.jpg"
  },
  {
    id: "image_9",
    src: "/src/assets/images/gallery/3.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_3.jpg"
  },
  {
    id: "image_10",
    src: "/src/assets/images/gallery/1.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_1.jpg"
  },
  {
    id: "image_11",
    src: "/src/assets/images/gallery/1.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_1.jpg"
  },
  {
    id: "image_12",
    src: "/src/assets/images/gallery/2.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_2.jpg"
  },
  {
    id: "image_13",
    src: "/src/assets/images/gallery/3.jpg",
    alt: "",
    thumbnail: "/src/assets/images/gallery/_thumbnail/thumb_3.jpg"
  }
];

const Gallery = () => {
  return (
    <div className="grid grid-flow-col max-w-[1280px] mx-auto justify-between my-11 gap-4">
      <GalleryList data={imageData} />
    </div>
  );
};

export default Gallery;
