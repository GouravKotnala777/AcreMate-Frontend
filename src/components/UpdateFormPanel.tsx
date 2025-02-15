

interface UpdateFormPanelPropTypes{
    formPanelFor:string|null;
}

const UpdateFormPanel = ({formPanelFor}:UpdateFormPanelPropTypes) => {
    
    if (formPanelFor === "clients") {
        return <h1>client update Form</h1>
    }
    else if (formPanelFor === "plots") {
        return <h1>plot update Form</h1>
    }
    if (formPanelFor === "slips") {
        return <h1>slip update Form</h1>
    }
    if (formPanelFor === "sites") {
        return <h1>site update Form</h1>
    }
    else{
        return <h1>nullish or another route create Form</h1>
    }
};

export default UpdateFormPanel;