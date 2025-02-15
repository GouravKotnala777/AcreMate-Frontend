

interface DeleteFormPanelPropTypes{
    formPanelFor:string|null;
}

const DeleteFormPanel = ({formPanelFor}:DeleteFormPanelPropTypes) => {
    
    if (formPanelFor === "clients") {
        return <h1>client delete Form</h1>
    }
    else if (formPanelFor === "plots") {
        return <h1>plot delete Form</h1>
    }
    if (formPanelFor === "slips") {
        return <h1>slip delete Form</h1>
    }
    if (formPanelFor === "sites") {
        return <h1>site delete Form</h1>
    }
    else{
        return <h1>nullish or another route create Form</h1>
    }
};

export default DeleteFormPanel;