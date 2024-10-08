import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const [loginType, setLoginType] = useState("parent");
    const { setToken, setEmail } = useContext(StoreContext); 
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate(); 

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = `http://localhost:5000/${loginType}`; 

        if (currState === 'Login') {
            if (loginType === 'parent') {
                newUrl += "/user/parent-login"; 
            } else {
                newUrl += "/user/vaccine-user-login"; 
            }
        } else {
            if (loginType === 'parent') {
                newUrl += "/user/parent-register"; 
            } else {
                newUrl += "/user/vaccine-user-register"; 
            }
        }

        try {
            const response = await axios.post(newUrl, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.success) {
                setToken(response.data.token);
                setEmail(data.email); 
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                toast.success(response.data.message);

                if (loginType === 'parent') {
                    navigate('/parent');
                } else {
                    navigate('/vaccination-center'); 
                }
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error("User not registered or wrong credentials");
        }
    };

    return (
        <div>
            <div className="login">
                <form onSubmit={onLogin} className='login-container'>
                    <div className="login-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="login-click" />
                    </div>

                    {/* Login type selection */}
                    <div className="login-type">
                        <label>
                            <input
                                type="radio"
                                name="loginType"
                                value="parent"
                                checked={loginType === "parent"}
                                onChange={() => setLoginType("parent")}
                            />
                            Parent Login
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="loginType"
                                value="vaccine"
                                checked={loginType === "vaccine"}
                                onChange={() => setLoginType("vaccine")}
                            />
                            Vaccination Center Login
                        </label>
                    </div>

                    <div className="login-input">
                        {currState === "Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
                        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter your email' required />
                        <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Enter your password' required />
                    </div>

                    <button type="submit"> {currState === "SignUp" ? "Create an account" : "Login"} </button>

                    {currState === "Login" ?
                        <p>Create an account <span className='login-click' onClick={() => setCurrState("SignUp")}>Click here</span></p>
                        :
                        <p>Already have an account? <span className='login-click' onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>
            </div>
        </div>
    );
};

export default Login;
