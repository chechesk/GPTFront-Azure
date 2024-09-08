import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="*" 
        element={
          <div className="grid h-screen place-content-center bg-white px-4">
            <h1 className="uppercase tracking-widest text-gray-500">
              404 | Not Found
            </h1>
          </div>
        } 
      />
    </Routes>
  );
};

export default Root;
