import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import SignUp from "./components/SignUp";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/chat/:userId" element={<ChatWindow />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
