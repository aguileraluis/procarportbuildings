import React from 'react';
import Navbar from '../components/Navigation';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import About from '../components/About';
import Testimonials from "../components/Testimonials";
import Demo from "../components/Demo";
import Hero from '../components/Hero';
import Photos from '../components/Photos';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 2000
});

const Home = () => {

  const galleryImagesTwo = [
    {
      img: 'https://i.postimg.cc/zBXDChPn/carport31.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/K8PmCf6P/carport32.jpg'
    },
    {
      img: 'https://i.postimg.cc/VvkSkp8P/carport29.jpg'
    },
    {
      img: 'https://i.postimg.cc/V69TkbkC/carport17.jpg'
    },
    {
      img: 'https://i.postimg.cc/Rh6PyPD4/carport25.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/BQjghKfB/carport19.jpg'
    },
    {
      img: 'https://i.postimg.cc/DzTPypJx/carport20.jpg'
    },
    {
      img: 'https://i.postimg.cc/hjCLsSCY/carport21.jpg'
    },
    {
      img: 'https://i.postimg.cc/ncV8MT7c/carport15.jpg'
    },
    {
      img: 'https://i.postimg.cc/FH12VRDM/carport16.jpg'
    }
  ]

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <br/>
      <br/>
      <Photos galleryImages={galleryImagesTwo} />
      <Categories />
      <Demo />
      <Testimonials />
      <br />
      <br />
      <Announcement />
      <br />
      <br />
      <div className="mapdiv" style={{ textAlign: 'center', justifyContent: 'center', marginTop: '20px' }} data-aos="flip-up">
        <img id="logopic" style={{ width: '90%', height: 'auto', textAlign: 'center', justifyContent: 'center' }} src="https://i.postimg.cc/xdkf49m4/servicemap-overlay.png" alt="boutiquepic" />
      </div>
      <Newsletter/> 
      <Footer />
    </div>
  )
}

export default Home