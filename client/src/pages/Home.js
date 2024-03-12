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
import video from '../videos/video.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 2000
});

const Home = () => {

  const galleryImagesTwo = [
    {
      img: 'https://i.postimg.cc/hPQNdPTJ/403012-Garage.jpg'
    },
    {
      img: 'https://i.postimg.cc/RhksRKKW/carolinabarn-fotor-2024022712307.jpg'
    },
    {
      img: 'https://i.postimg.cc/SRNNKbHQ/carport6-fotor-2024022712163.png'
    },
    {
      img: 'https://i.postimg.cc/76frt1G9/carport12-fotor-20240227121112.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/1XFhs9KN/carport15-fotor-20240227122115.png'
    },
    {
      img: 'https://i.postimg.cc/cL0yGGtr/carport16-fotor-20240227121811.png'
    },
    {
      img: 'https://i.postimg.cc/d3rXg5q2/carport18-fotor-20240227121316.png'
    },
    {
      img: 'https://i.postimg.cc/65xFCx0Y/carport19-1-fotor-2024022712250.jpg'
    },
    {
      img: 'https://i.postimg.cc/sf440Fzn/IMG-4964-fotor-20240223163224.jpg'
    },
    {
      img: 'https://i.postimg.cc/5yKYdSnt/IMG-5068-fotor-20240223162519.jpg'
    },
    {
      img: 'https://i.postimg.cc/g2ZwQRRY/IMG-5262-fotor-2024022685533.jpg'
    },
    {
      img: 'https://i.postimg.cc/43vYNgBq/IMG-5284-fotor-20240223165928.jpg'
    },
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
      <br/>
        <br/>
        <br/>
      <Demo />

     <br/>
     <br/>
     <br/>
     <br/>
      <div style={{textAlign: 'center'}}> 
      <video controls muted width='570' height='320' src={video} title='Youtube video player' frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
      </div>
     
      <Testimonials />
      <br />
      <br />
      <Announcement />
      <br />
      <br />
      <div className="mapdiv" style={{ textAlign: 'center', justifyContent: 'center', marginTop: '20px' }} data-aos="flip-up">
        <img id="logopic" style={{ width: '90%', height: 'auto', textAlign: 'center', justifyContent: 'center' }} src="https://i.postimg.cc/5NFh31KT/Coverage-Area-1.png" alt="boutiquepic" />
      </div>
      <Newsletter/> 
      <Footer />
    </div>
  )
}

export default Home