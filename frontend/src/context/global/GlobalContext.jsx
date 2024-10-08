import { createContext, useState } from "react";

import { getUser, signout } from "../../services/authService";

// Create a Context
const GlobalContext = createContext();

// Create a Provider component
export const GlobalProvider = ({ children }) => {
  // * artworks state | fetch from api, set state, pass that state to our compoennts
  // * on filter / search, that function will fire again, which will change our state

  // user state | retrieve the user, set them to local storage,
  const [user, setUser] = useState(getUser());
  // console.log(user)
  

  const handleSignout = () => {
    signout();
    setUser(null);
  };


  // showing our exb | set exhibitions | set exhibition detail | create, delete, edit
  ///////////////////////////
  // Format Date
  ///////////////////////////
  const formatDate = (date) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const formatDateForEdit = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <GlobalContext.Provider value={{ user, setUser, handleSignout,formatDate,formatDateForEdit }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
