import React, { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import Weather from "@/components/Weather";
import useBackgroundImage from "@/hooks/useBackgroundImage";

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { imageUrl, photoLink } = useBackgroundImage(); // Fetch dynamic background

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const dayProgress = ((time.getHours() * 60 + time.getMinutes()) / 1440) * 100; // Calculate day progress %

  return (
    <div className="app" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="weather-card">
        <Weather />
      </div>

      <div className="glass-card hero-card">
        <div className="hero">
          <div className="date-container">
            <h1>
              {time.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h1>

            <ProgressBar progress={dayProgress} />

            <p>
              {time.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ padding: "1rem" }}>
        <p>
          <a
            title="background"
            href={photoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
          >
            /background
          </a>
        </p>
        <p>
          <a
            title="github"
            href="https://github.com/AyanavaKarmakar/luminance"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
          >
            /github
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
