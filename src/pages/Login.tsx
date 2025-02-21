import { ChangeEvent, useState } from "react";
import { BG_COLOR } from "../utils/constants";
import { Button, Heading, Input } from "../shared/SharedComponents";
import { RegisterFormData } from "./Register";
import { login } from "../api";


export interface LoginFormData{
    email:string;
    password:string;
}


const Login = () => {
    const [formData, setFormData] = useState<Pick<RegisterFormData, "email"|"password">>({email:"", password:""});
    
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        await login(formData);
        console.log(formData);
    };

    return(
        <div className="register_bg">
            <Heading text="User Login" textAlign="center" />
            <div className="form">
                <Input label="Email" name="email" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Input label="Password" name="password" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Button text="Login" onClickHandler={onClickHandler}  />
            </div>
        </div>
    )
};

export default Login;