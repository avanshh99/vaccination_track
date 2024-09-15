import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';
import { StoreContext } from "../../context/StoreContext"
import './Login.css'
const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const { setToken } = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `http://localhost:5000/parent`

        if (currState === 'Login') {
            newUrl += "/user/parent-login"
        } else {
            newUrl += "/user/parent-register"
        }

        try {
            const response = await axios.post(newUrl, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })

            if (response.data.success) {
                setToken(response.data.message)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error("User Not Register or wrong credendials")
        }
    }
    return (
        <div>
            <div className="login">
                <form onSubmit={onLogin} className='login-container'>
                    <div className="login-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="login-click" />
                    </div>
                    <div className="login-input">
                        {currState === "Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='enter your name' required />}
                        <input type="text" name="email" onChange={onChangeHandler} value={data.email} placeholder='enter your email' required />
                        <input type="text" name="password" onChange={onChangeHandler} value={data.password} placeholder='enter your password ' required />
                    </div>
                    <button type="submit"> {currState === "SignUp" ? "create an account " : "Login "}</button>
                    {currState === "Login" ?
                        <p>create an account <span className='login-click' onClick={() => setCurrState("SignUp")}>click here</span></p>
                        :
                        <p>already have an account <span className='login-click' onClick={() => setCurrState("Login")}>Login here </span></p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login

