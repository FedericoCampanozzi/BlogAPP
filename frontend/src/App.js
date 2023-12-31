import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";
import { SharedStateProvider } from "./shared/state-context";
import Layout from "./layout";
import Registration from "./pages/registration/registration";
import Login from "./pages/login/login";
import AddPost from "./pages/add-post/add-post";
import PostDetail from "./pages/post-detail/post-detail";

function App() {
  return (
    <SharedStateProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/add-post" element={<AddPost />}></Route>
            <Route path="/post-detail" element={<PostDetail />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
    </SharedStateProvider>
  );
}

export default App;
