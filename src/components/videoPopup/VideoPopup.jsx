import React from 'react'
import './style.scss'
import ReactPlayer from 'react-player/youtube'

const VideoPopup = ({ videoId, setVideoId, show, setShow }) => {

  const hideVideo = () => {
    setShow(false)
    setVideoId(null)
  }

  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hideVideo}></div>
      <div className="videoPlayer">
        <span onClick={hideVideo}>close</span>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} width="100%" />
      </div>
    </div>
  )
}

export default VideoPopup
