import "../styles/pages/register.scss";
import { Button, Heading, Input, Select } from "../shared/SharedComponents";
import { BG_COLOR } from "../utils/constants";
import { ChangeEvent, useState } from "react";
import { register } from "../api";

export interface RegisterFormData{
    firstName:string;
    lastName:string;
    email:string;
    gender:string;
    mobile:string;
    password:string;
}

const Register = () => {
    const [formData, setFormData] = useState<RegisterFormData>({firstName:"", lastName:"", email:"", gender:"", mobile:"", password:""});

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if (e.target.type === "text" || e.target.type === "number") {
            setFormData({...formData, [e.target.name]:e.target.value});
        }
        else{
            setFormData({...formData, [e.target.name]:e.target.value});
        }
    };

    const onClickHandler = async() => {
        console.log(formData);
        await register(formData);
    };

    return(
        <div className="register_bg">
            <Heading text="User Register" textAlign="center" />
            <div className="form">
                <Input label="First Name" name="firstName" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Input label="Last Name" name="lastName" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Input label="Email" name="email" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Select label="Gender" name="gender" options={["male", "female", "other"]} border="1px solid rgb(78, 255, 175)" onChangeHandler={onChangeHandler} />
                <Input label="Mobile" name="mobile" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Input label="Password" name="password" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Button text="Register" onClickHandler={onClickHandler}  />
            </div>
        </div>
    )
};

export default Register;