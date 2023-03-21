import { useEffect, useState } from 'react';

const FlipClock: React.FC<{ origin: Date }> = ({ origin }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date();
      const timeSinceOrigin = Math.floor((currentTime.getTime() - origin.getTime()) / 1000);
      const days = Math.floor(timeSinceOrigin / (3600 * 24));
      const hours = Math.floor((timeSinceOrigin % (3600 * 24)) / 3600);
      const minutes = Math.floor((timeSinceOrigin % 3600) / 60);
      const seconds = timeSinceOrigin % 60;

      setTime({ days, hours, minutes, seconds });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [origin]);

  return (
    <div className="flex space-x-2">
      <div className="bg-black text-white font-mono text-6xl p-2 rounded">
        {time.days.toString().padStart(2, '0')}
      </div>
      <div className="text-6xl">:</div>
      <div className="bg-black text-white font-mono text-6xl p-2 rounded">
        {time.hours.toString().padStart(2, '0')}
      </div>
      <div className="text-6xl">:</div>
      <div className="bg-black text-white font-mono text-6xl p-2 rounded">
        {time.minutes.toString().padStart(2, '0')}
      </div>
      <div className="text-6xl">:</div>
      <div className="bg-black text-white font-mono text-6xl p-2 rounded">
        {time.seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default FlipClock;