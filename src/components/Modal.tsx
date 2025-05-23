import "../styles/components/modal.scss";
import { Dispatch, ReactNode, SetStateAction } from "react";


interface ModalPropTypes{
    heading:string;
    isOpen:boolean;
    setIsOpen:Dispatch<SetStateAction<boolean>>;
    form?:ReactNode;
    onCancelHandler:()=>void;
}

const Modal = ({heading, isOpen, setIsOpen, form, onCancelHandler}:ModalPropTypes) => {

    return(
        <div className="modal_cont" onClick={() => setIsOpen(false)} style={{
            display:isOpen?"block":"none"
        }}>
            {/*<div className="modal_overlay" onClick={() => setIsOpen(false)}></div>*/}
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal_heading">{heading}</h1>
                {form}
                <button className="modal_cancel_btn" onClick={onCancelHandler}>Cancel</button>
            </div>
        </div>
    )
};

export default Modal;