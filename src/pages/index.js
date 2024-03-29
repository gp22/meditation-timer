import React, { useState } from 'react';
import useTimer from 'easytimer-react-hook';
import '../css/style.css';
import bell from '../sounds/bell-hard.m4a';
import threeBells from '../sounds/bell-hard-3.m4a';

const IndexPage = () => {
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
  const [bellStartValues, SetBellStartValues] = useState({
    seconds: 4,
  });
  const numBells = 3;
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
  const [bellTimer, isBellTargetAchieved] = useTimer({ updateWhenTargetAchieved });
  const [meditationTimer, isMeditationTargetAchieved] = useTimer({ updateWhenTargetAchieved });
  const [waitTimer, isWaitTargetAchieved] = useTimer({ updateWhenTargetAchieved });

  const playBell = (numBells) => {
    const audio = new Audio(threeBells);
    audio.play();
  };

  const startTimer = () => {
    waitTimer.addEventListener('targetAchieved', function (e) {
      playBell(numBells);

      meditationTimer.start({
        startValues: meditationStartValues,
        target,
        countdown,
        precision
      });
    });

    meditationTimer.addEventListener('targetAchieved', function (e) {
      playBell(numBells);
    });

    waitTimer.start({
      startValues: waitStartValues,
      target,
      countdown,
      precision
    });
  };

  return (
    <>
      <audio preload="auto" src={threeBells}/>

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
    </>
  );
};

export default IndexPage;
