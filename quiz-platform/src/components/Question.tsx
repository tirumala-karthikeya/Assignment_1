import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";

interface QuestionProps {
  question: string;
  options: string[];
  onSelect: (answer: string) => void;
  questionId: number;
}

const Question: React.FC<QuestionProps> = ({ question, options, onSelect, questionId }) => {
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
  }, [questionId]);

  const handleClick = (option: string) => {
    if (!answered) {
      setAnswered(true);
      onSelect(option);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded-4 text-center w-50">
        <Card.Title className="mb-3 fs-4 fw-bold text-primary">{question}</Card.Title>
        <div className="d-grid gap-3">
          {options.map((option, index) => (
            <Button
              key={index}
              className="py-2 fw-semibold rounded-pill"
              variant={answered ? "secondary" : "primary"}
              disabled={answered}
              onClick={() => handleClick(option)}
              style={{ transition: "0.3s", fontSize: "1.1rem" }}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default Question;
