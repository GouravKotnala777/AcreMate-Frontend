import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
//import Header from "./components/Header.tsx";
import { Toaster } from "react-hot-toast";
import Clients from "./pages/Clients.tsx";
import Plots from "./pages/Plots.tsx";
import Slips from "./pages/Slips.tsx";
import Sites from "./pages/Sites.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import SideBarWrapper from "./components/SideBarWrapper.tsx";
import CreateFormPanel from "./components/CreateFormPanel.tsx";
//import { useState } from "react";
//import { RoutesTypes } from "./types.ts";
import UpdateFormPanel from "./components/UpdateFormPanel.tsx";
import DeleteFormPanel from "./components/DeleteFormPanel.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import { useSelectedRoute } from "./Context.tsx";
import { SinglePlot, SingleSite } from "./pages/SingleItemPage.tsx";
import Agents from "./pages/Agents.tsx";


function App() {
  const {selectedRoute} = useSelectedRoute();
  //const [selectedRoute, setSelectedRoute] = useState<RoutesTypes|null>(null);



  return (
    <>
    {/*<pre>{JSON.stringify(selectedRoute, null, `\t`)}</pre>*/}
      <Toaster />
      <BrowserRouter>
        <SideBarWrapper
          createFormPanel={
            <CreateFormPanel 
              formPanelFor={
                selectedRoute?
                selectedRoute.toLowerCase()
                :
                null
              }
            />
          }
          updateFormPanel={
            <UpdateFormPanel formPanelFor={
              selectedRoute?
              selectedRoute.toLowerCase()
              :
              null
            } />
          }
          removeFormPanel={
            <DeleteFormPanel formPanelFor={
              selectedRoute?
              selectedRoute.toLowerCase()
              :
              null
            } />
          }
          mainChildrenPanel={
            <Routes>
              {/*<Route path="/" element={<h1>Hallllo</h1>} />*/}
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/plots" element={<Plots />} />
              <Route path="/slips" element={<Slips />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/me" element={<MyProfile />} />
              <Route path="/single-plot" element={<SinglePlot />} />
              <Route path="/single-site" element={<SingleSite />} />
              {/*<Route path="/plot/assign" element={} />*/}
            </Routes>
          }
         />
      </BrowserRouter>
    </>
  )
}

export default App
