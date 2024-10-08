import { useEffect, useState } from "react";
// import ArtGallery from "../ArtWorks/ArtGallery";
// import { FilterActionBtns } from "../ArtWorks/ArtSearch";
import useExbContext from "../../context/exb/useExbContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Masonry from "react-masonry-css";
// import ArtGalleryCard from "../ArtWorks/ArtGalleryCard";
import ExbArtworkCard from "./ExbArtworkCard";


const ExbDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetExbDetail, showExb, handleDeleteExb, handleGetUserExbs } =
    useExbContext();
  const { user } = useGlobalContext();
  const [objectidMap, setObjectidMap] = useState([]);
  const { formatDate } = useGlobalContext();
  ///////////////////////////
  // Masony Grid Data
  ///////////////////////////

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  ///////////////////////////
  // Get Detail Data
  ///////////////////////////
  useEffect(() => {
    const getDetailData = async () => {
      const data = await handleGetExbDetail(id);
      // setFormData(data);
    };
    getDetailData();
  }, []);

  ///////////////////////////
  // Fext Exb detail | test
  ///////////////////////////
  useEffect(() => {
    const fetchExbDetail = async () => {
      const test = await handleGetExbDetail(id);
      // console.log(test, ' <-- test')
    };

    fetchExbDetail();
  }, []);

  ///////////////////////////
  // Display objectidMap
  ///////////////////////////
  useEffect(() => {
    console.log(showExb.userId, " <-- userId");
    console.log(user.user.id, " <-- signed in user id");
  }, []);
  const isUsersExb = showExb.userId === user.user.id;

  ///////////////////////////
  // ! Delete Btn
  ///////////////////////////
  const handleDeleteButton = async (e) => {
    try {
      const data = await handleDeleteExb(id);
      handleGetUserExbs();
      navigate("/exhibitions/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center mx-auto mb-16 w-1/2">
          <h1 className="text-6xl mb-5 font-marcellus">{showExb.title}</h1>
          <p className="text-4xl font-cardo">Location: {showExb.location}</p>
          <p className="text-4xl mb-10 font-cardo">
            Dates: {formatDate(showExb.startDate)} -{" "}
            {formatDate(showExb.endDate)}
          </p>
          <p className="text-3xl font-cardo">{showExb.description}</p>

          {isUsersExb && (
            <div className="flex gap-4 text-2xl mt-8">
              <Link to={`/exhibitions/${id}/edit`}>
                <button className="border border-black px-6 py-1 font-cardo">
                  Edit exhibition details
                </button>
              </Link>
              <button
                onClick={() => handleDeleteButton()}
                className="border border-black px-6 py-1 font-cardo"
              >
                Delete exhibition
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mx-auto">
          <p className=" text-center text-2xl font-cardo">
            Contains{" "}
            <span className="text-red-400">{showExb?.artworks?.length} </span>
            artworks
          </p>
          <div className="w-3/4 mx-auto mt-8">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {showExb?.artworks?.map((record) => {
                return (
                  <ExbArtworkCard
                    isUsersExb={isUsersExb}
                    key={record.ArtworkObjectid}
                    ArtworkObjectid={record.ArtworkObjectid}
                  />
                );
              })}
            </Masonry>
          </div>
        </div>
      </section>
    </>
  );
};
export default ExbDetail;
