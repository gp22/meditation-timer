//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

import * as React from 'react';
import bell from '../sounds/bell-hard.m4a'; // Tell webpack this JS file uses this image

// styles
const pageStyles = {
  color: '#232129',
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

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
  const bellInterval = 2500;

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
    this.state = { meditationTime: { minutes: 0, seconds: 10 }, waitTime: { minutes: 0, seconds: 10 } };
    this.timer = null;
  }

  componentDidMount () {
    const seconds = timeToSeconds(this.state.meditationTime);
    const timeLeft = secondsToTime(seconds);
    this.setState({ meditationTime: timeLeft });
  }

  startTimer = () => {
    const seconds = timeToSeconds(this.state.meditationTime);
    if (!this.timer && seconds) {
      this.timer = setInterval(this.countDown, 1000);
      playBells();
    }
  };

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const seconds = timeToSeconds(this.state.meditationTime) - 1;
    this.setState({
      meditationTime: secondsToTime(seconds)
    });

    // Check if we're at zero.
    if (!seconds) {
      clearInterval(this.timer);
      playBells();
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
    const minutes = this.state.meditationTime.minutes;
    const displayMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const seconds = this.state.meditationTime.seconds;
    const displaySeconds = seconds > 9 ? seconds : `0${seconds}`;

    return (
      <main style={pageStyles}>
        <title>Meditation Timer</title>
        <div>
          <p>{displayMinutes}:{displaySeconds}</p>

          <div>
            <div>
              <label htmlFor="count-in">Count In (seconds)</label>
              {secondOptions && secondOptions.length && (
                <div>
                  <select id={'count-in'} onChange={this.onChangeSeconds} disabled={this.timer}
                          value={this.state.waitTime.seconds}>
                    {secondOptions.map((option, index) => {
                      return <option key={index}>{option.value}</option>;
                    })}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="meditation-time">Meditation Time (minutes)</label>
              {minuteOptions && minuteOptions.length && (
                <div>
                  <select id={'meditation-time'} onChange={this.onChangeMeditateTime} disabled={this.timer}
                          value={this.state.meditationTime.minutes}>
                    {minuteOptions.map((option, index) => {
                      return <option key={index}>{option.value}</option>;
                    })}
                  </select>
                </div>
              )}
            </div>

            <div>
              <button onClick={this.startTimer} disabled={this.timer}>Meditate</button>
            </div>
          </div>

        </div>
      </main>
    );
  }
}

export default IndexPage;
