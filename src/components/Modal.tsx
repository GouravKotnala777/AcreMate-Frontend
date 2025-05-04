import { FormSharedComponent } from "../shared/SharedComponents";
import "../styles/components/modal.scss";
import { ChangeEvent, Dispatch, SetStateAction } from "react";


interface ModalPropTypes{
    heading:string;
    isOpen:boolean;
    setIsOpen:Dispatch<SetStateAction<boolean>>;
    onChangeHandler:(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>void;
    onSubmitHandler:()=>Promise<void>;
    onCancelHandler:()=>void;
}

const Modal = ({heading, isOpen, setIsOpen, onSubmitHandler, onChangeHandler, onCancelHandler}:ModalPropTypes) => {

    return(
        <div className="modal_cont" onClick={() => setIsOpen(false)} style={{
            display:isOpen?"block":"none"
        }}>
            {/*<div className="modal_overlay" onClick={() => setIsOpen(false)}></div>*/}
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal_heading">{heading}</h1>
                <FormSharedComponent
                    inputArray={[
                        {name:"siteName", label:"Site Name", type:"text"},
                        {name:"totalSize", label:"Total Size", type:"number"},
                        {name:"soldArea", label:"Sold Area", type:"number"},
                    ]}
                    onChangeFeildsHandler={(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => onChangeHandler(e)}
                    onSubmitFormHandler={onSubmitHandler}
                    btnText="Submit"
                />
                <button className="modal_cancel_btn" onClick={onCancelHandler}>Cancel</button>
            </div>
        </div>
    )
};

export default Modal;