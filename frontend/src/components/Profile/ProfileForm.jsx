import { useEffect, useState } from "react";
import Btn from "../CommonComponents/Btn";
import useGlobalContext from "../../context/global/useGlobalContext";
import { updateUserInfo } from "../../services/profileService";

export const ProfileForm = () => {
  const { user } = useGlobalContext();
  //   initalize formData state
  const initialFormData = {
    username: user.user.username,
    email: user.user.email,
    headerImg: null,
    profileImg: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const { username, email, headerImg, profileImg } = formData;

  const multiFormData = new FormData();
  multiFormData.append("username", username);
  multiFormData.append("email", email);
  multiFormData.append("headerImg", headerImg);
  multiFormData.append("profileImg", profileImg);

  const handleSubmit = async () => {
    try {
      await updateUserInfo(multiFormData, user.user.id);
    } catch (err) {
      console.error(err);
      console.log(`Unable to submit formdata to backend to update user info`);
    }
  };
  const handleFileChange = (e) => {
    const { files, name } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  const handleCancel = () => {
    console.log("cancel");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <form className=" mx-auto  p-12 rounded-md w-full md:w-1/2">
      {/* Username */}
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-xl font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-xl font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Header Image */}
      <div className="mb-5">
        <label
          htmlFor="headerImage"
          className="block mb-2 text-xl font-medium text-gray-900"
        >
          Header Image
        </label>
        <input
          type="file"
          id="headerImage"
          name="headerImage"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Profile Image */}
      <div className="mb-5">
        <label
          htmlFor="profileImage"
          className="block mb-2 text-xl font-medium text-gray-900"
        >
          Profile Image
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center items-center gap-12">
        <Btn handleAction={handleCancel} text="Cancel" />
        <Btn handleAction={handleSubmit} text="Update" />
      </div>
    </form>
  );
};
