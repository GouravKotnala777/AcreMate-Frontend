import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "../styles/components/sidebar_wrapper.scss";
import Header from "./Header";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { RoutesTypes } from "../types";

interface SideBarWrapperPropTypes{
    setSelectedRoute:Dispatch<SetStateAction<RoutesTypes|null>>;
    createFormPanel:ReactNode;
    updateFormPanel:ReactNode;
    removeFormPanel:ReactNode;
    mainChildrenPanel:ReactNode;
}

const SideBarWrapper = ({setSelectedRoute, createFormPanel, updateFormPanel, removeFormPanel, mainChildrenPanel}:SideBarWrapperPropTypes) => {
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
    const [selectedPanel, setSelectedPanel] = useState<"create"|"update"|"remove"|"main">("main");

    return(
        <div className="sidebar_wrapper_bg">
            <header><Header setSelectedPanel={setSelectedPanel} setSelectedRoute={setSelectedRoute} /></header>

            <section>
                <aside style={{
                    flex:isSidebarActive?"15%":"5%"
                }}>
                    <div className="sidebar_options_cont">
                        <button className="sidebar_option" onClick={() => {
                            setSelectedPanel("main");
                        }}>{isSidebarActive?"main":"M"}</button>
                        <button className="sidebar_option" onClick={() => {
                            setSelectedPanel("create");
                        }}>{isSidebarActive?"create":"C"}</button>
                        <button className="sidebar_option" onClick={() => {
                            setSelectedPanel("update");
                        }}>{isSidebarActive?"update":"U"}</button>
                        <button className="sidebar_option" onClick={() => {
                            setSelectedPanel("remove");
                        }}>{isSidebarActive?"remove":"R"}</button>
                    </div>



                    <button className="sidebar_closer"
                        onClick={() => setIsSidebarActive(!isSidebarActive)}
                    >{isSidebarActive?<BiLeftArrow className="sidebar_arrow" />:<BiRightArrow className="sidebar_arrow" />}</button>
                </aside>
                <main style={{
                    flex:isSidebarActive?"85%":"95%"
                }}>
                    {
                        selectedPanel === "create"?
                            createFormPanel
                            :
                            selectedPanel === "update"?
                                updateFormPanel
                                :
                                selectedPanel === "remove"?
                                    removeFormPanel
                                    :
                                    mainChildrenPanel
                    }
                </main>
            </section>
        </div>
    )
}

export default SideBarWrapper;