import React from 'react';
import john from '../images/logo.png'
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 2000
});

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img className="aboutimg" src='https://i.postimg.cc/K8m6BPQ6/LOGO-modified.png' alt='john' data-aos="flip-right"/>
                <div className='col-2'>
                    <h1 data-aos="flip-left">ProCarport Buildings is a distinguished family-owned business that offers Steel Structures in Different Dimensions, Shades and Styles. </h1>
                    <span className='line'></span>
                    <p data-aos="flip-right">With over 20 years of experience behind our team, you are guaranteed the best service.</p>
                    <p data-aos="flip-left">Trust that we will deliver high quality steel buildings!</p>
                    {/* <button className='button'>Explore More</button> */}
                </div>
            </div>
        </div>
    )
}

export default About