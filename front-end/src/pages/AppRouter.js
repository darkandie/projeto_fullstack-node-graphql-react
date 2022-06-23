import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Project from "./Project";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/projects/:id" element={<Project/>}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default AppRouter;