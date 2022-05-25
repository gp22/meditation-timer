//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

import * as React from "react"
import bell from "../sounds/bell-hard.m4a" // Tell webpack this JS file uses this image

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLink = {
  text: "Documentation",
  url: "https://www.gatsbyjs.com/docs/",
  color: "#8954A8",
}

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

// data
const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial/",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
    color: "#E95800",
  },
  {
    text: "How to Guides",
    url: "https://www.gatsbyjs.com/docs/how-to/",
    description:
      "Practical step-by-step guides to help you achieve a specific goal. Most useful when you're trying to get something done.",
    color: "#1099A8",
  },
  {
    text: "Reference Guides",
    url: "https://www.gatsbyjs.com/docs/reference/",
    description:
      "Nitty-gritty technical descriptions of how Gatsby works. Most useful when you need detailed information about Gatsby's APIs.",
    color: "#BC027F",
  },
  {
    text: "Conceptual Guides",
    url: "https://www.gatsbyjs.com/docs/conceptual/",
    description:
      "Big-picture explanations of higher-level Gatsby concepts. Most useful for building understanding of a particular topic.",
    color: "#0D96F2",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
    color: "#8EB814",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    badge: true,
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
    color: "#663399",
  },
]


const secondOptions = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
  { value: 60 }
]

const minuteOptions = [
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 }
]

const playBell = () => {
  const audio = new Audio(bell);
  audio.play();
}

const playBells = () => {
  const bellInterval = 2500;

  setTimeout(playBell, 0);
  setTimeout(playBell, bellInterval);
  setTimeout(playBell, bellInterval * 2);
}

const secondsToTime = (secs) => {
  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return {
    minutes,
    seconds
  };
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: { minutes: 0, seconds: 10 }, seconds: 10 };
    this.timer = null;
  }

  componentDidMount() {
    const timeLeft = secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  startTimer = () => {
    if (!this.timer && this.state.seconds) {
      this.timer = setInterval(this.countDown, 1000);
      playBells();
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (!seconds) {
      clearInterval(this.timer);
      playBells();
    }
  }

  onChangeMinutes = (e) => {
    console.log(e.target.value);
  }

  onChangeSeconds = (e) => {
    console.log(e.target.value);
  }

  render() {
    return (
      <main style={pageStyles}>
        <title>Meditation Timer</title>
        <div>
          <p>{this.state.time.minutes}:{this.state.time.seconds}</p>

          <div>
            <label htmlFor="count-in">Count In</label>
            {secondOptions && secondOptions.length && (
              <div>
                <select id={'count-in'} onChange={this.onChangeSeconds}>
                  {secondOptions.map((option, index) => {
                    return <option key={index}>{option.value}</option>;
                  })}
                </select>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="meditation-time">Meditation Time</label>
            {minuteOptions && minuteOptions.length && (
              <div>
                <select id={'meditation-time'} onChange={this.onChangeMinutes}>
                  {minuteOptions.map((option, index) => {
                    return <option key={index}>{option.value}</option>;
                  })}
                </select>
              </div>
            )}
          </div>

          <button onClick={this.startTimer}>Meditate</button>
        </div>
      </main>
    )
  }
}

export default IndexPage
