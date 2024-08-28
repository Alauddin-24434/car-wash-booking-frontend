import './Banner.css';

const Banner = () => {
    return (
        <div>
            <section className="relative h-screen flex flex-col items-center justify-center text-center text-white">
                <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                    <iframe
                        width="560"
                        height="215"
                        src="https://www.youtube.com/embed/_3W7tuxFYS8?autoplay=1&mute=1&loop"
                        title="YouTube video player"
                        frameBorder="0"
                 
                        allowFullScreen
                        className="absolute min-w-full min-h-full object-cover"
                    ></iframe>
                </div>
                <div className="video-content z-10">
                    <h1 className="font-light text-6xl">Full Hero Video</h1>
                    <h3 className="font-light text-3xl">with TailwindCSS</h3>
                </div>
            </section>
        </div>
    );
};

export default Banner;
