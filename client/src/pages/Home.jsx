import React from "react";
import HeroSection from './HeroSection';
import About from "./About";
const Home = () => {

    return (
        <div className="relative p-8">
            <section id="home" ><HeroSection /></section>
            <section id="about"> <About/> </section>
                
            
            
            
        </div>
    );
};

export default Home;