import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(register({ name, email, password }) as any);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } catch {
      console.error("Registration error");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
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
          <Button variant="primary" type="submit" className="w-100 btn-lg">Register</Button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/" className="fw-bold">Login here</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
