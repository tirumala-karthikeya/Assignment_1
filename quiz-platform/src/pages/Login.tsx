import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await dispatch(login({ email, password }) as any);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                {showPassword ? <EyeSlash /> : <Eye />}
              </span>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 btn-lg" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register" className="fw-bold">Register here</Link>
          </p>
          <p className="text-center">
            <Link to="/forgot-password" className="text-danger fw-bold">Forgot Password?</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
