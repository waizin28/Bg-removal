import { createContext, useState } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credits, setCredits] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

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
      if (!isSignedIn) {
        // open sign in pop up component
        return openSignIn;
      }

      setImage(imageFile);
      setResultImage(false);

      // send user to result page
      navigate('/result');

      const token = await getToken();
      const formData = new FormData();
      imageFile && formData.append('image', imageFile);

      const { data } = await axios.post(
        `${backendUrl}/api/image/remove-bg`,
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setResultImage(data.resultImage);
        data.creditBalance && setCredits(data.creditBalance);
      } else {
        toast.error(data.message);
        data.creditBalance && setCredits(data.creditBalance);
        // Navigate to credit purchase page
        if (data.creditBalance <= 0) {
          navigate('/buy');
        }
      }
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
    resultImage,
    setResultImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
