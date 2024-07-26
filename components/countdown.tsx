"use client";

import { useEffect, useState } from 'react';

interface CountdownProps {
  date: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +date - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      {Object.keys(timeLeft).length ? (
        <>
          <div className="p-4 bg-foreground text-background rounded-lg m-2 min-w-[120px]">
            <span className="text-2xl md:text-4xl">{timeLeft.days}</span>
            <span className="block">Dias</span>
          </div>
          <div className="p-4 bg-foreground text-background rounded-lg m-2 min-w-[120px]">
            <span className="text-2xl md:text-4xl">{timeLeft.hours}</span>
            <span className="block">Horas</span>
          </div>
          <div className="p-4 bg-foreground text-background rounded-lg m-2 min-w-[120px]">
            <span className="text-2xl md:text-4xl">{timeLeft.minutes}</span>
            <span className="block">Minutos</span>
          </div>
          <div className="p-4 bg-foreground text-background rounded-lg m-2 min-w-[120px]">
            <span className="text-2xl md:text-4xl">{timeLeft.seconds}</span>
            <span className="block">Segundos</span>
          </div>
        </>
      ) : (
        <span>Concluído!</span>
      )}
    </div>
  );
};

export default Countdown;
