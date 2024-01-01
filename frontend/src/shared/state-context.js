import { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState();
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);

  return (
    <SharedStateContext.Provider
      value={{
        userAuth,
        setUserAuth,
        posts,
        setPosts,
        topics,
        setTopics
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => useContext(SharedStateContext);
