import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateScore, resetQuiz, setCorrectAnswers } from "../redux/quizSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Card } from "react-bootstrap";

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const score = useSelector((state: RootState) => state.quiz.score);
  const answers = useSelector((state: RootState) => state.quiz.answers);
  const correctAnswers = useSelector((state: RootState) => state.quiz.correctAnswers);

  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        const data = await response.json();

        const correctAnswersMap: Record<number, string> = {};
        data.forEach((question: { id: number; correctAnswer: string }) => {
          correctAnswersMap[question.id] = question.correctAnswer;
        });

        dispatch(setCorrectAnswers(correctAnswersMap));
      } catch (error) {
        console.error("Error fetching correct answers:", error);
      }
    };

    if (Object.keys(correctAnswers).length === 0) {
      fetchCorrectAnswers();
    }
  }, [dispatch, correctAnswers]);

  useEffect(() => {
    if (Object.keys(answers).length > 0 && Object.keys(correctAnswers).length > 0) {
      dispatch(calculateScore());
    }
  }, [answers, correctAnswers, dispatch]);

  const handleRestart = () => {
    dispatch(resetQuiz());
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      {Object.keys(correctAnswers).length === 0 ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card className="p-5 text-center shadow-lg rounded-4">
          <h2 className="fw-bold text-success">🎯 Quiz Completed!</h2>
          <h3 className="my-3 text-primary fw-bold">
            Your Score: <span className="text-dark">{score}</span> / {Object.keys(correctAnswers).length}
          </h3>
          <Button
            variant="primary"
            className="mt-3 py-2 px-4 fw-semibold rounded-pill"
            onClick={handleRestart}
            style={{ transition: "0.3s", fontSize: "1.1rem" }}
          >
            🔄 Restart Quiz
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default Results;
