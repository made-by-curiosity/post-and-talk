import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [photoList, setPhotoList] = useState([]);
  const [photoId, setPhotoId] = useState(1);

  console.log('photoList ', photoList);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  const savePhotoInfo = photoInfo => {
    const infoToSave = {
      ...photoInfo,
      id: photoId,
    };
    setPhotoList(list => [...list, infoToSave]);
    setPhotoId(id => id + 1);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, logIn, logOut, savePhotoInfo, photoList }}>
      {children}
    </UserContext.Provider>
  );
};
