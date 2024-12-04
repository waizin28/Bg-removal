import { createContext, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credits, setCredits] = useState(false);
  const [image, setImage] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  const loadCredits = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredits(data.credits);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeBg = async (imageFile) => {
    try {
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    credits,
    setCredits,
    loadCredits,
    backendUrl,
    image,
    setImage,
    removeBg,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;