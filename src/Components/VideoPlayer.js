import React, { Component } from "react";
import Parser from "html-react-parser";

class VideoPlayer extends Component {
  state = {
    paused: true,
    loop: false,
    volume: 0.5,
    muted: false,
    duration: 0,
  };

  contextMenu = (e) => {
    e.preventDefault();
  };

  // Playing and pausing the video
  handlePlay = () => {
    const video = document.getElementById("v");
    this.setState({
      paused: !this.state.paused,
    });
    if (this.state.paused === true) {
      video.play();
      this.setState({
        paused: false,
      });
    } else {
      video.pause();
      this.setState({
        paused: true,
      });
    }
  };

  // Handle Stop Button
  handleStop = () => {
    const video = document.getElementById("v");
    video.pause();
    this.setState({
      paused: true,
    });
    video.currentTime = 0;
  };

  // Loop the video
  handleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  // Set Width on Clicked timerbar
  setWidth = (e) => {
    const video = document.getElementById("v");
    const timerWrapper = document.querySelector(".timer");
    const timerBar = document.querySelector(".timer div");
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    timerBar.style.width = x + "px";
    video.currentTime =
      ((x / timerWrapper.clientWidth) * 100 * video.duration) / 100;
  };

  // Updating the elapsed time
  setTime = () => {
    const video = document.getElementById("v");
    const timerWrapper = document.querySelector(".timer");
    const timer = document.querySelector(".timestamp span");
    const timerBar = document.querySelector(".timer div");
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = "0" + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = "0" + seconds;
    } else {
      secondValue = seconds;
    }

    let videoTime = minuteValue + ":" + secondValue;
    timer.textContent = videoTime;

    let barLength =
      timerWrapper.clientWidth * (video.currentTime / video.duration);
    timerBar.style.width = barLength + "px";
  };

  // Handle Volume
  customVolume = () => {
    const video = document.getElementById("v");
    const volumeRange = document.querySelector(".volume");
    video.volume = volumeRange.value;
    video.muted = false;
    this.setState({
      volume: volumeRange.value,
    });
    if (volumeRange.value == 0) {
      this.setState({
        muted: true,
      });
    } else {
      this.setState({
        muted: false,
      });
    }
  };

  handleMute = () => {
    const video = document.getElementById("v");
    video.muted = true;
    this.setState({
      muted: true,
    });
    if (this.state.muted == true) {
      video.muted = false;

      this.setState({
        muted: false,
      });
    } else {
      video.muted = true;
      this.setState({
        muted: true,
      });
    }
  };

  // Duration of video
  formatTime = () => {
    const video = document.getElementById("v").duration;
    let minutes = parseInt(video / 60);
    let seconds = parseInt(video % 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = "0" + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = "0" + seconds;
    } else {
      secondValue = seconds;
    }
    this.setState({
      duration: minuteValue + ":" + secondValue,
    });
  };

  // Full Screen Mode
  toggleFullScreen = () => {
    const player = document.querySelector(".player");
    const controls = document.querySelector(".controls");
    if (document.fullscreenElement) {
      document.exitFullscreen();
      controls.style.position = "relative";
    } else {
      player.requestFullscreen();
      controls.style.position = "absolute";
    }
  };

  render() {
    return (
      <>
        <div className="player">
          <video
            onClick={this.handlePlay}
            onEnded={this.handleStop}
            onLoadedMetadata={this.formatTime}
            onTimeUpdate={this.setTime}
            id="v"
            onContextMenu={this.contextMenu}
            loop={this.state.loop}
          >
            <source
              src={process.env.PUBLIC_URL + "/videos/arrow-trailer.mp4"}
              type="video/mp4"
            />
          </video>
          <div className="controls">
            <div className="left-side">
              <button
                onClick={this.handleLoop}
                className={this.state.loop == true ? "loop active" : "loop"}
                title="loop"
              >
                <i className="f7-icons">arrow_2_circlepath</i>
              </button>
              <button
                onClick={this.handlePlay}
                className="play"
                title={this.state.paused == true ? "Play" : "Pause"}
              >
                {this.state.paused == true
                  ? Parser('<i class="f7-icons">play</i>')
                  : Parser('<i class="f7-icons">pause</i>')}
              </button>
              <button onClick={this.handleStop} className="stop" title="Stop">
                <i className="f7-icons">stop_fill</i>
              </button>
              <div className="timestamp">
                <span aria-label="timer">00:00</span>{" "}
                <span className="seprat">/</span>{" "}
                <span className="duration">{this.state.duration}</span>
              </div>
              <div onClick={this.setWidth} className="timer">
                <div></div>
              </div>
            </div>
            <div className="right-side">
              <div className="volume-controls">
                <button onClick={this.handleMute} className="mute-button">
                  {this.state.muted == true
                    ? Parser('<i class="f7-icons">speaker_slash</i>')
                    : Parser('<i class="f7-icons">speaker_2</i>')}
                </button>
                <input
                  type="range"
                  name="volume"
                  className="volume"
                  min="0"
                  max="1"
                  step="0.05"
                  defaultValue={this.state.volume}
                  onChange={this.customVolume.bind(this)}
                />
              </div>
              <button
                onClick={this.toggleFullScreen}
                className="resize"
                title="Full Screen"
              >
                <i className="f7-icons">resize</i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default VideoPlayer;
