import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  startTime: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, startTime, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration - Math.floor((Date.now() - startTime) / 1000));

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(duration - Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout, duration, startTime]);

  return <h4 className="text-danger">Time Left: {Math.max(0, timeLeft)}s</h4>;
};

export default Timer;
