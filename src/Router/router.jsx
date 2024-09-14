import { Route, Routes, useLocation } from "react-router-dom";
import ChatDasb from "../Components/Chat/chat";
import Home from "../Pages/Home/index";
import Nav from "../Components/Nav/nav";
import NotFound from "../Pages/NotFoun/NotFound";

const Root = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <Routes>
      {/* {!isLoginPage && <Route path="/chat" element={<Nav />} />} */}
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatDasb />} />
      <Route 
        path="*" 
        element={<NotFound />} 
      />
    </Routes>
  );
};

export default Root;
