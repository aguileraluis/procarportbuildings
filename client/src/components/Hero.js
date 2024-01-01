import React from 'react';
import { Carousel } from 'react-bootstrap';
import heroone from '../images/heroone.jpg';
import herotwo from '../images/herotwo.jpg';
import herothree from '../images/herothree.jpg';
import './Hero.css';

function Hero() {
  return (
    <Carousel data-bs-theme="dark" fade={true} pause={false}>
      <Carousel.Item interval={5000}>
        <img
          className="heroimg d-block w-100"
          src="https://i.postimg.cc/9M5xhLtB/FB0106-1024x576.webp"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1 className="h1tag" style={{backgroundColor: 'teal'}}>Welcome to Pro Carport Buildings</h1>
   
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="heroimg d-block w-100"
          src="https://i.postimg.cc/LXK7nh42/carport23.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1 className="h1tag" style={{backgroundColor: 'teal'}}>Quality is our top priority</h1>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}> 
        <img
          className="heroimg d-block w-100"
          src="https://i.postimg.cc/3NpYwSPJ/FB0216-1024x576.webp"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1 className="h1tag" style={{backgroundColor: 'teal'}}>Best prices around</h1>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Hero;