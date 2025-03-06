import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExpand, FaCompress, FaPlay, FaLock, FaDownload, FaHeart, FaRegHeart, FaShare } from 'react-icons/fa';

const VideoPlayerPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [premiumVideos, setPremiumVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Mock data for premium videos
    const mockPremiumData = {
      "status": true,
      "items": [
        {
          "id": "1",
          "name": "Introduction to Web Development",
          "size": 158008374,
          "resolution": 720,
          "status": "Ready",
          "thumbnail": "https://i.vimeocdn.com/video/590587169_640.jpg",
          "duration": "12:30",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          "id": "2",
          "name": "HTML & CSS Fundamentals",
          "size": 128008374,
          "resolution": 1080,
          "status": "Ready",
          "thumbnail": "https://i.vimeocdn.com/video/589972810_640.jpg",
          "duration": "18:45",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          "id": "3",
          "name": "JavaScript Basics",
          "size": 178008374,
          "resolution": 720,
          "status": "Ready",
          "thumbnail": "https://i.vimeocdn.com/video/590587169_640.jpg",
          "duration": "22:15",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          "id": "4",
          "name": "Responsive Design Principles",
          "size": 148008374,
          "resolution": 1080,
          "status": "Ready",
          "thumbnail": "https://i.vimeocdn.com/video/589972810_640.jpg",
          "duration": "15:20",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
          "id": "5",
          "name": "Building Your First Web App",
          "size": 188008374,
          "resolution": 720,
          "status": "Ready",
          "thumbnail": "https://i.vimeocdn.com/video/590587169_640.jpg",
          "duration": "28:10",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ],
      "pagination": {
        "current": 1,
        "next": 1
      }
    };

    // In a real application, you would fetch the course data based on courseId
    // This is a mock implementation
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          setCourse({
            id: courseId,
            title: "Advanced Web Development",
            description: "Learn the latest techniques in web development with this comprehensive course. Master HTML, CSS, JavaScript, and responsive design principles to build modern, interactive websites.",
            instructor: {
              name: "Jane Smith",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            }
          });
          setPremiumVideos(mockPremiumData.items);
          setSelectedVideo(mockPremiumData.items[0]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching course:", error);
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const toggleFullscreen = () => {
    const videoContainer = document.querySelector('.video-player__container');
    
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
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

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div className="video-player loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading premium content...</p>
        </div>
      </div>
    );
  }

  if (!course) {
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

  return (
    <div className="video-player">
      <div className="video-player__header">
        <div className="container">
          <button className="btn btn--back" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h1>{course.title}</h1>
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
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            
            <div className="video-player__actions">
              <div className="video-player__action-buttons">
                <button 
                  className={`btn btn--icon ${isFavorite ? 'active' : ''}`} 
                  onClick={toggleFavorite}
                  title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
              
              <div className="video-player__quality">
                <span className="quality-badge">{selectedVideo?.resolution}p</span>
                <span className="duration-badge">{selectedVideo?.duration}</span>
              </div>
            </div>
            
            <div className="video-player__info">
              <div className="video-player__video-title">
                <h2>{selectedVideo?.name}</h2>
              </div>
              
              <div className="video-player__instructor">
                <img src={course.instructor.avatar} alt={course.instructor.name} />
                <div className="instructor-details">
                  <span className="instructor-label">Instructor</span>
                  <span className="instructor-name">{course.instructor.name}</span>
                </div>
              </div>
              
              <div className="video-player__description">
                <h3>About this course</h3>
                <p>{course.description}</p>
              </div>
            </div>
          </div>
          
          <div className="video-player__playlist">
            <div className="video-player__playlist-header">
              <h3 className="video-player__playlist-title">Premium Videos</h3>
              <span className="video-player__playlist-count">{premiumVideos.length} videos</span>
            </div>
            
            <div className="video-player__playlist-items">
              {premiumVideos.map((video) => (
                <div 
                  key={video.id} 
                  className={`video-player__playlist-item ${selectedVideo?.id === video.id ? 'active' : ''}`}
                  onClick={() => handleSelectVideo(video)}
                >
                  <div className="video-player__playlist-thumbnail">
                    <img src={video.thumbnail} alt={video.name} />
                    <div className="video-player__playlist-overlay">
                      {video.status === "Ready" ? (
                        <FaPlay />
                      ) : (
                        <FaLock />
                      )}
                    </div>
                    <span className="video-player__playlist-duration">{video.duration}</span>
                  </div>
                  <div className="video-player__playlist-info">
                    <h4>{video.name}</h4>
                    <div className="video-player__playlist-meta">
                      <span className="resolution">{video.resolution}p</span>
                      <span className={`video-player__playlist-status ${video.status.toLowerCase()}`}>
                        {video.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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