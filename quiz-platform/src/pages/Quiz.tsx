import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { submitAnswer } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import Question from "../components/Question";
import Timer from "../components/Timer";

interface QuestionType {
  id: string;
  question: string;
  options: string[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data: QuestionType[] = await response.json();
        setQuestions(data);

        // Restore saved index
        const savedQuestionIndex = parseInt(localStorage.getItem("currentQuestion") || "0", 10);
        setCurrentQuestion(savedQuestionIndex < data.length ? savedQuestionIndex : 0);

        // Restore start time
        const savedTime = localStorage.getItem("quizStartTime");
        const startTime = savedTime ? parseInt(savedTime, 10) : Date.now();
        setQuizStartTime(startTime);
        if (!savedTime) localStorage.setItem("quizStartTime", startTime.toString());

        setLoading(false);
      } catch (err) {
        setError("Error loading questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelect = (answer: string) => {
    if (questions.length === 0 || currentQuestion >= questions.length) return;
  
    dispatch(
      submitAnswer({
        questionId: Number(questions[currentQuestion].id), 
        answer,
      })
    );
  
    setTimeout(nextQuestion, 500);
  };
  

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      localStorage.setItem("currentQuestion", nextIndex.toString());
    } else {
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("quizStartTime");
      navigate("/results");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  if (questions.length === 0 || currentQuestion >= questions.length) return null;

  return (
    <Container className="text-center">
      {quizStartTime !== null && (
        <Timer duration={60} startTime={quizStartTime} onTimeout={() => navigate("/results")} />
      )}
      <Question
        questionId={Number(questions[currentQuestion].id)} 
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        onSelect={handleSelect}
      />
    </Container>
  );
};

export default Quiz;
