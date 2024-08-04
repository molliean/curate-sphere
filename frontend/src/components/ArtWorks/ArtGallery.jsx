import useArtworkContext from "../../context/artwork/useArtworkContext";
import DisplayError from "../CommonComponents/DisplayError";
import Loader from "../CommonComponents/Loader";
import ArtGalleryCard from "./ArtGalleryCard";
import Masonry from "react-masonry-css";
const ArtGallery = () => {
  const { records, isLoading, isError } = useArtworkContext();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (isLoading) return <Loader />;
  if (isError) return <DisplayError />;
  return (
    <div className="w-3/4 mx-auto mt-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {records.map((record) => {
          return (
            <ArtGalleryCard
              img={record.primaryimageurl}
              division={record.division}
              title={record.title}
              year={record.dated}
              details={record.description}
              key={record.id}
              people={record.people}
            />
          );
        })}
      </Masonry>
    </div>
  );
};
export default ArtGallery;
