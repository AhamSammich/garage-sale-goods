import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  async function handleSubmit(ev) {
    ev.preventDefault();

    await signup(email, password);
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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

      <button type="submit" disabled={isLoading}>
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
