import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();
  
    async function handleSubmit(ev) {
      ev.preventDefault();
  
      await login(email, password);
    }
  
    return (
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
  
        <label htmlFor="">Email</label>
        <input
          type="email"
          onChange={(ev) => setEmail(ev.target.value)}
          value={email}
        />
  
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
          value={password}
        />
  
        <button type="submit" disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
  }
  