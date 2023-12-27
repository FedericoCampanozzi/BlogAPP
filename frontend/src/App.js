import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";
import { SharedStateProvider } from "./shared/state-context";
import Layout from "./layout";

function App() {
  return (
    <SharedStateProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
    </SharedStateProvider>
  );
}

export default App;
