import { useEffect, useState } from "react";
import useArtworkContext from "../../../context/artwork/useArtworkContext";

export const SearchFilterCheckBox = ({ category, primaryCategoryKey }) => {
  // this will start as false, static value from prop
  const [isChecked, setIsChecked] = useState(category.isChecked);
  // this will start as 0. static value from prop
  const [clickCount, setClickCount] = useState(category.clickCount);
const categoryNameStr = category.name
  const { handleSelectFilters, handleRemoveFilter, handleToggleCheckbox,handleFilterObj } =
    useArtworkContext();

  // useEffect(() => {
  //   // function to filter results of artworks
  //   if (isChecked) {
  //     handleSelectFilters(primaryCategoryKey, category.id);
  //   } else if (!isChecked && clickCount > 0) {
  //     handleRemoveFilter(primaryCategoryKey, category.id);
  //   }
  // }, [isChecked]);

  return (
    <li className="flex items-center gap-4 p-3 bg-gray-200 ">
      <div
      data-cy="subcategory-checkbox"
        onClick={() => {
          setIsChecked((prev) => !prev);
          setClickCount((prev) => prev + 1);
          console.log(clickCount, isChecked)
          console.log(category, ' <--category')
          handleToggleCheckbox(primaryCategoryKey, category.id,category.name, !isChecked, clickCount + 1);
          // testing new query solution below
          // console.log()
          handleFilterObj(primaryCategoryKey.toLowerCase(), category.name, category.id)
        }}
        className="border-2 relative z-10 border-black p-3 cursor-pointer"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          {isChecked ? "X" : ""}
        </span>
      </div>
      <span className="capitalize">{category.name}</span>
    </li>
  );
};
