import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Button, Container, Form, Alert, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setError("Failed to reset password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5 w-50">
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
