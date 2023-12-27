import { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState();
  const [posts, setPosts] = useState();

  return (
    <SharedStateContext.Provider
      value={{
        userAuth,
        setUserAuth,
        posts,
        setPosts
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => useContext(SharedStateContext);
