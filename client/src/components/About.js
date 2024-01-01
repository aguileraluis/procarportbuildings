import React from 'react';
import john from '../images/logocarport.png';
import './About.css';

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img className="aboutimg" src={john} alt='john' />
                <div className='col-2'>
                    <h1>One Of The Fastest Carport & Garage Builders Around The Area!</h1>
                    <span className='line'></span>
                    <p>Our goal has always been to provide FAST and QUALITY service to our customers from day one. With over 25 years of experience behind our team, you are guaranteed the best of the best. Trust that you will you receive a high quality steel building that will not only protect your very precious and valuable vehicles, boats, and so on, but they will stand against all odds of nature. Rest assured that our team prides itself in building the finest buildings, whether on water or on land, give us a chance and you will fall in love with your new building.</p>
                    <p>There is something that seperates the best from the rest, the ability to provide FAST, EFFICIENT, and EXCELLENT service all at the same time.</p>
                    {/* <button className='button'>Explore More</button> */}
                </div>
            </div>
        </div>
    )
}

export default About