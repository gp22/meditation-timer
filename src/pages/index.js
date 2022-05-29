//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

import React, { useState } from 'react';
import useTimer from 'easytimer-react-hook';
import '../css/style.css';
import bell from '../sounds/bell-hard.m4a'; // Tell webpack this JS file uses this image

const secondOptions = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
  { value: 60 }
];

const minuteOptions = [
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 }
];

const playBell = () => {
  const audio = new Audio(bell);
  audio.play();
};

const playBells = () => {
  const bellInterval = 3000;

  setTimeout(playBell, 0);
  setTimeout(playBell, bellInterval);
  setTimeout(playBell, bellInterval * 2);
};

const IndexPage = () => {
  const [meditationStartValues, SetMeditationStartValues] = useState({
    minutes: 15,
  });
  const [waitStartValues, SetWaitStartValues] = useState({
    seconds: 60,
  });
  const target = {
    minutes: 0,
    seconds: 0,
  };
  const countdown = true;
  const precision = 'seconds';
  const updateWhenTargetAchieved = true;
  const [meditationTimer, isMeditationTargetAchieved] = useTimer({ updateWhenTargetAchieved });
  const [waitTimer, isWaitTargetAchieved] = useTimer({ updateWhenTargetAchieved });

  const startTimer = () => {
    waitTimer.addEventListener('targetAchieved', function (e) {
      meditationTimer.start({
        startValues: meditationStartValues,
        target,
        countdown,
        precision
      });
    });

    waitTimer.start({
      startValues: waitStartValues,
      target,
      countdown,
      precision
    });
  };

  return (
    <div>
      <audio preload="auto" src={bell}/>

      <main className="cover">
        <div className="cluster">
          <div>
            <label htmlFor="count-in">Count In</label>
            {secondOptions && secondOptions.length && (
              <div>
                <select id={'count-in'}
                        onChange={(e) => SetWaitStartValues({ seconds: Number(e.target.value) })}
                        disabled={meditationTimer.isRunning() || waitTimer.isRunning()}
                        value={waitStartValues.seconds}>
                  {secondOptions.map((option, index) => {
                    return <option key={index} value={option.value}>{option.value} (seconds)</option>;
                  })}
                </select>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="meditation-time">Meditation Time</label>
            {minuteOptions && minuteOptions.length && (
              <div>
                <select id={'meditation-time'}
                        onChange={(e) => SetMeditationStartValues({ minutes: Number(e.target.value) })}
                        disabled={meditationTimer.isRunning() || waitTimer.isRunning()}
                        value={meditationStartValues.minutes}>
                  {minuteOptions.map((option, index) => {
                    return <option key={index} value={option.value}>{option.value} (minutes)</option>;
                  })}
                </select>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={startTimer}
              disabled={meditationTimer.isRunning() || waitTimer.isRunning()}
            >Meditate
            </button>
          </div>
        </div>

        <div className="centered center and-text">
          <p className="timer">{
            isWaitTargetAchieved
              ? meditationTimer.getTimeValues().toString(['minutes', 'seconds'])
              : waitTimer.getTimeValues().toString(['minutes', 'seconds'])
          }</p>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
