import { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState();
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState(["Math","Science","Data Science","Machine Learning","Coding","C#","C++","JS"]);

  return (
    <SharedStateContext.Provider
      value={{
        userAuth,
        setUserAuth,
        posts,
        setPosts,
        topics
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => useContext(SharedStateContext);
