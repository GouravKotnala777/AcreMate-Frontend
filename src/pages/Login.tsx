import { ChangeEvent, useState } from "react";
import { BG_COLOR } from "../utils/constants";
import { ButtonSecondary, Heading, Input } from "../shared/SharedComponents";
import { RegisterFormData } from "./Register";
import { login } from "../api";
import { useLoginUser } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export interface LoginFormData{
    email:string;
    password:string;
}


const Login = () => {
    const {setLoginUser} = useLoginUser();
    const [formData, setFormData] = useState<Pick<RegisterFormData, "email"|"password">>({email:"", password:""});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        const {email, password} = formData;
        if (!email || !password) {
            toast.error("All fields are required", {
                duration:2500,
                position:"top-center"
            });
            return;
        }


        setIsLoading(true);
        const loginRes = await login(formData);
        if(loginRes.success){            
            setLoginUser(loginRes.jsonData);
            setTimeout(() => {
                setIsLoading(false);
                navigate("/home");
            }, 2500);
        }
        else{
            setIsLoading(false);
        }
    };

    return(
        <div className="register_bg">
            <Heading text="User Login" textAlign="center" />
            <div className="form">
                <Input label="Email" name="email" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <Input label="Password" name="password" labelBG={BG_COLOR} onChangeHandler={onChangeHandler} />
                <ButtonSecondary text="Login" onClickHandler={onClickHandler} isLoading={isLoading} isDisable={isLoading} />
            </div>
            <div className="login_lower_part">
                <div className="forget_pass">
                <Link className="forget_pass_link" to="/forget-password">Forget Password</Link>
                </div>
                <div className="dont_have_acc">
                    <span>Don't have accont?</span>
                    <Link className="register_link" to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;