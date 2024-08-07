import { Link } from "react-router-dom";


export const ExbCard = ({ title, date, location, id }) => {


    return (
      <li className="flex flex-col items-center w-full md:flex-row md:max-w-[40rem] lg:max-w-[40rem] overflow-hidden shadow-md font-cardo ">
        <img
          className="w-full md:w-1/2 md:h-full object-cover"
          src="https://nrs.hvrd.art/urn-3:HUAM:DDC251942_dynmc?width=3000&height=3000"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 p-3 md:pl-6 md:w-1/2">
          <span className="text-3xl mt-4">{title}</span>
          <span className="text-2xl">Date: {date}</span>
          <span className="text-2xl">Location: {location}</span>
          <Link to={`/exhibition/${id}`}>
            <button className="text-[12px] border-black border w-3/4 mx-auto mb-4">
              View full details
            </button>
          </Link>
        </div>
      </li>
    );
  };