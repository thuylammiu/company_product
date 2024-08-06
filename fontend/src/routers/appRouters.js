import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import OpenAIChatbot from "../pages/OpenAIChatbot";
import Home from "../pages/Home";
import AddEditProduct from "../components/product/AddEditProduct";
import HeaderBar from "../components/common/HeaderBar";
import ChatbotModal from "../components/chatbot/ChatbotModal";

const appRouters = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <>
        <HeaderBar />
        <Login isMember={true} />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <HeaderBar />
        <Login isMember={false} />
      </>
    ),
  },
  {
    path: "/openai",
    element: (
      <>
        <HeaderBar />
        <OpenAIChatbot />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <HeaderBar />
        <Home />
        <ChatbotModal />
      </>
    ),
  },
  {
    path: "/add",
    element: (
      <>
        <HeaderBar />
        <AddEditProduct />
      </>
    ),
  },
  {
    path: "edit/:id",
    element: (
      <>
        <HeaderBar />
        <AddEditProduct />
      </>
    ),
  },
]);

export default appRouters;
