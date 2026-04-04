import { useState } from "react";
import {useNavigate, Link} from "react-router-dom"
import API from "../services/api";
const Login = ()=>{
    const [form,setForm] = useState({
            email: "",
            password: ""
        });
    const navigate = useNavigate();
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await API.post("/auth/login",form);
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard")
        }catch(err){
            alert(`error login : ${err}`);
        }
    };
    return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;

