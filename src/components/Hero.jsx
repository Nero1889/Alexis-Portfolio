function Hero() {
    return (
        <section id="hero">
            <p>Meet Alexis...</p>
            <h1>FRONT-END <br/> WEB DEVELOPER</h1>

            <div className="arrow">
                {Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="bar"/>
                ))}
            </div>
        </section>
    );
}

export default Hero;