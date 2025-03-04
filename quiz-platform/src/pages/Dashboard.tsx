import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  console.log("Redux Auth State:", auth); 

  if (!auth?.token) {
    return <p className="text-center text-danger mt-4">Please log in first.</p>;
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-4 fw-bold mb-3">Welcome, {auth?.user?.name || "User"}!</h1>
      <p className="lead text-secondary">Your email: {auth?.user?.email}</p>

      <button 
        onClick={() => navigate("/quiz")}
        className="btn btn-primary mt-4 px-4 py-2"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Dashboard;
