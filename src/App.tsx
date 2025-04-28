import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Toaster } from "react-hot-toast";
import Slips from "./pages/Slips.tsx";
import Sites from "./pages/Sites.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import Agents from "./pages/Agents.tsx";
import Header from "./components/Header.tsx";
import CreateFormPanel from "./components/CreateFormPanel.tsx";
import SingleSite from "./pages/SingleSite.tsx";
import SinglePlot from "./pages/SinglePlot.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useLoginUser } from "./Context.tsx";
import { useEffect } from "react";
import { myProfile } from "./api.ts";


function App() {
  const {loginUser, setLoginUser} = useLoginUser();

  useEffect(() => {
    myProfile()
    .then((myProfileRes) => {
      if (myProfileRes.success) {
        setLoginUser(myProfileRes.jsonData);     
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute ChildElement={<Home />} userRole={loginUser?.role} />} />
          <Route path="/home" element={<ProtectedRoute ChildElement={<Home />} userRole={loginUser?.role} />} />
          <Route path="/agents" element={<ProtectedRoute ChildElement={<Agents />} userRole={loginUser?.role} />} />
          <Route path="/slips" element={<ProtectedRoute ChildElement={<Slips />} userRole={loginUser?.role} />} />
          <Route path="/sites" element={<ProtectedRoute ChildElement={<Sites />} userRole={loginUser?.role} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<ProtectedRoute ChildElement={<MyProfile />} userRole={loginUser?.role} />} />
          <Route path="/single-plot" element={<ProtectedRoute ChildElement={<SinglePlot />} userRole={loginUser?.role} />} />
          <Route path="/single-site" element={<ProtectedRoute ChildElement={<SingleSite />} userRole={loginUser?.role} />} />
          <Route path="/create" element={<ProtectedRoute ChildElement={<CreateFormPanel />} userRole={loginUser?.role} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
