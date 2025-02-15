import { ChangeEvent, useState } from "react";
import { FormSharedComponent } from "../shared/SharedComponents";
import { createClient } from "../api";
import { CreateClientBodyTypes } from "../types";


interface CreateFormPanelPropTypes{
    formPanelFor:string|null;
}

const CreateFormPanel = ({formPanelFor}:CreateFormPanelPropTypes) => {
    const [createFormData, setCreateFormData] = useState<CreateClientBodyTypes>({serialNumber:0, name:"", guardian:"", email:"", gender:"male", mobile:""});
    
    const onChangeFeildsHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setCreateFormData({...createFormData, [e.target.name]:e.target.value});
    };

    const onSubmitFormHandler = () => {
        createClient(createFormData);
    }

    if (formPanelFor === "clients") {
        return(
            <FormSharedComponent inputArray={[
                {label:"Serial No.", name:"serialNumber"},
                {label:"Client Name", name:"name"},
                {label:"Guardian's Name", name:"guardian"},
                {label:"Email", name:"email"},
                {label:"Gender", name:"gender"},
                {label:"Mobile", name:"mobile"},
            ]}
            onChangeFeildsHandler={onChangeFeildsHandler}
            onSubmitFormHandler={onSubmitFormHandler}
            />
        )
    }
    else if (formPanelFor === "plots") {
        return <h1>plot create Form</h1>
    }
    if (formPanelFor === "slips") {
        return <h1>slip create Form</h1>
    }
    if (formPanelFor === "sites") {
        return <h1>site create Form</h1>
    }
    else{
        return <h1>nullish or another route create Form</h1>
    }
};

export default CreateFormPanel;