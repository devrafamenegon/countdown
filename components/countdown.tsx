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
  const endMessage = process.env.NEXT_PUBLIC_END_MESSAGE || "Finalizado!";
  const progressMessage = process.env.NEXT_PUBLIC_PROGRESS_MESSAGE || "✈";

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +date - +new Date();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const calculatePercentageLeft = (): number => {
    const currentDate = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

    const totalDuration = date.getTime() - twoMonthsAgo.getTime();
    const remainingTime = date.getTime() - currentDate.getTime();

    if (remainingTime <= 0) {
      return 100;
    }

    return ((totalDuration - remainingTime) / totalDuration) * 100;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [percentageLeft, setPercentageLeft] = useState<number>(calculatePercentageLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setPercentageLeft(calculatePercentageLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      {percentageLeft < 100 && Object.keys(timeLeft).length && (timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds) ? (
        <>
          {['Dias', 'Horas', 'Minutos', 'Segundos'].map((label, index) => (
            <div key={label} className="p-4 bg-foreground text-background rounded-lg m-2 min-w-[120px]">
              <span className="text-2xl md:text-4xl">{Object.values(timeLeft)[index]}</span>
              <span className="block">{label}</span>
            </div>
          ))}
          <div className="relative w-full mt-4 flex">
            <div 
              className="justify-end"
              style={{ width: `${percentageLeft - 5}%` }}
            ></div>
            <span className='text-3xl'>{progressMessage}</span>
          </div>
          <div className="relative w-full bg-black rounded-full mt-1 flex flex-col">
            <div 
              className="bg-[#f03a17] h-10 rounded-full justify-end"
              style={{ width: `${percentageLeft}%` }}
            ></div>
          </div>
        </>
      ) : (
        <h1 className='text-3xl font-medium'>{endMessage}</h1>
      )}
    </div>
  );
};

export default Countdown;
