import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaPlay,
  FaLock,
  FaDownload,
  FaHeart,
  FaRegHeart,
  FaShare,
} from "react-icons/fa";
import axios from "axios";
import { useCourseStore } from "../stores/useCourseStore";

const VideoPlayerPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { getSingleCourse, singleCourse, loading } = useCourseStore();

  useEffect(() => {
    getSingleCourse(courseId);
  }, []);

  console.log("singlecourse", singleCourse);

  const toggleFullscreen = () => {
    const videoContainer = document.querySelector(".video-player__container");

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="video-player loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading premium content...</p>
        </div>
      </div>
    );
  }

  if (!singleCourse) {
    return (
      <div className="video-player error">
        <div className="container">
          <h2>Course Not Found</h2>
          <p>Sorry, we couldn't find the requested course.</p>
          <button className="btn btn--primary" onClick={handleBack}>
            <FaArrowLeft /> Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleChangeVideo = (link)=>{
   setSelectedVideo(link)
  }

  return (
    <div className="video-player">
      <div className="video-player__header">
        <div className="container">
          <button className="btn btn--back" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h1>{singleCourse.title}</h1>
        </div>
      </div>

      <div className="container">
        <div className="video-player__content">
          <div className="video-player__main">
            <div className="video-player__container">
              <div className="video-player__controls">
                <button
                  className="btn btn--icon"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>

              {selectedVideo && (
                <iframe
                  src={selectedVideo}
                  // title={selectedVideo.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div className="video-player__actions">
              <div className="video-player__action-buttons">
                <button
                  className={`btn btn--icon ${isFavorite ? "active" : ""}`}
                  onClick={toggleFavorite}
                  title={
                    isFavorite ? "Remove from Favorites" : "Add to Favorites"
                  }
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  <span>Favorite</span>
                </button>

                <button className="btn btn--icon" title="Download Video">
                  <FaDownload />
                  <span>Download</span>
                </button>

                <button className="btn btn--icon" title="Share Video">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>

              <div className="video-player__stats ">
                <span className="duration-badge">
                  {singleCourse.duration} course
                </span>
                <span className="level-badge">
                {singleCourse.level}
                </span>
                <span className="rating-badge">
                {singleCourse.rating} ⭐
                </span>
              </div>
            </div>

            <div className="video-player__info">
              <div className="video-player__video-title">
                <h2>{singleCourse.title}</h2> 
              </div>

              <div className="video-player__instructor">
                <img
                  src={singleCourse.instructor.image}
                  alt={singleCourse.instructor.name}
                />
                <div className="instructor-details">
                  <span className="instructor-label">Instructor</span>
                  <span className="instructor-name">
                    {singleCourse.instructor.name}
                  </span>
                </div>
              </div>

              <div className="video-player__description">
                <h3>About this Course</h3>
                <p>{singleCourse.description}</p>
              </div>
            </div>
          </div>

          <div className="video-player__playlist">
            <div className="video-player__playlist-header">
              <h3 className="video-player__playlist-title">Premium Videos</h3>
              <span className="video-player__playlist-count">
              {singleCourse.abyssLinks.length}

              </span>
            </div>

            <div className="video-player__playlist-items">
               {singleCourse.abyssLinks.map((e,i) => {
                return <button className="item-button" onClick={()=>handleChangeVideo(e)}>{`Video ${i+1}`}</button>;
              })}
            </div>

            <div className="video-player__playlist-footer">
              <button className="btn btn--outline">View All Videos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
