import { useState } from "react";

export default function Login({OnLogin}){
    const [email,setemail]=useState("")
    const [password,setPassword]=useState("")
    function handleSubmit(e){
        e.preventDefault();

        OnLogin({email,password})
    }
    return(
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1 className="logo">Problem Notes</h1>
                <p className="muted">Log in to Continue</p>
                <label className="field">
                    <span>Email</span>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    placeholder="you@example.com"
                    />
                </label>
                <label className="field">
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="**********"
                    />
                </label>
                <button className="btn btn-primary btn-full" type="submit">
                    Log in
                </button>
            </form>
        </div>
    )
}