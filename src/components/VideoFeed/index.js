import { useRef, useEffect } from 'react';
import './VideoFeed.css';

export default function VideoFeed() {
	const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1080 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

	return (
    <video id="piFeed" ref={videoRef} />
  );
};