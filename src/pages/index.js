//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

import * as React from 'react';
import { Helmet } from 'react-helmet';
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

const secondsToTime = (secs) => {
  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return {
    minutes,
    seconds
  };
};

const timeToSeconds = (time) => {
  return minutesToSeconds(time.minutes) + time.seconds;
};

const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

class IndexPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { meditationTime: { minutes: 15, seconds: 0 }, waitTime: { minutes: 0, seconds: 60 } };
    this.meditationTimer = null;
    this.waitTimer = null;
  }

  componentDidMount () {
    const seconds = timeToSeconds(this.state.meditationTime);
    const timeLeft = secondsToTime(seconds);
    this.setState({ meditationTime: timeLeft });
  }

  startMeditateTimer = () => {
    const seconds = timeToSeconds(this.state.meditationTime);
    if (!this.meditationTimer && seconds) {
      this.meditationTimer = setInterval(this.countDownMeditation, 1000);
    }
  };

  startTimer = () => {
    const seconds = timeToSeconds(this.state.waitTime);
    if (!this.waitTimer && seconds) {
      this.waitTimer = setInterval(this.countDownWait, 1000);
    }
  };

  countDownMeditation = () => {
    const seconds = timeToSeconds(this.state.meditationTime) - 1;
    this.setState({
      meditationTime: secondsToTime(seconds)
    });

    if (!seconds) {
      clearInterval(this.meditationTimer);
      playBells();
    }
  };

  countDownWait = () => {
    const seconds = timeToSeconds(this.state.waitTime) - 1;
    this.setState({
      waitTime: secondsToTime(seconds)
    });

    if (!seconds) {
      clearInterval(this.waitTimer);
      playBells();
      this.startMeditateTimer();
    }
  };

  onChangeMeditateTime = (e) => {
    const minutes = e.target.value;
    const seconds = minutesToSeconds(minutes);
    const timeLeft = secondsToTime(seconds);

    this.setState({ meditationTime: timeLeft });
  };

  onChangeSeconds = (e) => {
    const seconds = e.target.value;
    const timeLeft = secondsToTime(seconds);

    this.setState({ waitTime: timeLeft });
  };

  render () {
    let minutes, seconds, displayMinutes, displaySeconds;

    if (this.waitTimer && !this.meditationTimer) {
      minutes = this.state.waitTime.minutes;
      displayMinutes = minutes > 9 ? minutes : `0${minutes}`;
      seconds = this.state.waitTime.seconds;
      displaySeconds = seconds > 9 ? seconds : `0${seconds}`;
    } else {
      minutes = this.state.meditationTime.minutes;
      displayMinutes = minutes > 9 ? minutes : `0${minutes}`;
      seconds = this.state.meditationTime.seconds;
      displaySeconds = seconds > 9 ? seconds : `0${seconds}`;
    }

    return (
      <>
        <Helmet>
          <link rel="preload" href={bell} as="audio" type="audio/m4a"/>
        </Helmet>

        <audio preload="auto" src={bell} />

        <main className="cover">
          <div className="cluster">
            <div>
              <label htmlFor="count-in">Count In</label>
              {secondOptions && secondOptions.length && (
                <div>
                  <select id={'count-in'} onChange={this.onChangeSeconds}
                          disabled={this.waitTimer || this.meditationTimer}
                          value={this.state.waitTime.seconds}>
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
                  <select id={'meditation-time'} onChange={this.onChangeMeditateTime}
                          disabled={this.waitTimer || this.meditationTimer}
                          value={this.state.meditationTime.minutes}>
                    {minuteOptions.map((option, index) => {
                      return <option key={index} value={option.value}>{option.value} (minutes)</option>;
                    })}
                  </select>
                </div>
              )}
            </div>

            <div>
              <button onClick={this.startTimer} disabled={this.waitTimer || this.meditationTimer}>Meditate</button>
            </div>
          </div>

          <div className="centered center and-text">
            <p className="timer">{displayMinutes}:{displaySeconds}</p>
          </div>
        </main>
      </>
    );
  }
}

export default IndexPage;
