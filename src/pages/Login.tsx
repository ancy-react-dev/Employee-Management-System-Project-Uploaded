
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      console.log("Email being sent:", JSON.stringify(email));
console.log("Password length:", password.length);
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      alert(`Status: ${response.status} | Message: ${data.message}`);
console.log("Login response:", response.status, data.message);
      if (!response.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      
      if (typeof data.token !== "string" || !data.token) {
        setMessage("Login token missing. Please try again.");
        return;
      }

      sessionStorage.setItem("authToken", data.token);
      setMessage("Login successful!");
      navigate("/dashboard");

    } catch {
      setMessage("Cannot connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand-icon">E</div>
        <p className="login-eyebrow">EMPLOYPRO WORKSPACE</p>
        <h1>Welcome back</h1>
        <p className="login-subtitle">
          Sign in to access your employee dashboard.
        </p>

        <form onSubmit={handleLogin}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {message && (
            <p className="login-error" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          Back to <Link to="/">Dashboard</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
