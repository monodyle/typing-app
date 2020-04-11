import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [onCooldown, setCooldown] = useState(false);

  function toggle() {
    setCooldown(!onCooldown);
  }

  function reset() {
    setTimeLeft(0);
    setCooldown(false);
  }

  useEffect(() => {
    let interval = null;
    if (onCooldown) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (!onCooldown && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [onCooldown, timeLeft]);

  return (
    <div className="app">
      <div className="time">
        {timeLeft}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${onCooldown ? 'active' : 'inactive'}`} onClick={toggle}>
          {onCooldown ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
