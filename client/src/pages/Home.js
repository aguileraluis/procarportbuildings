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

const Home = () => {
  return (
    <div>
     <Navbar /> 
     <Announcement />
     <Hero />
     <About />
     <Categories />
      <Demo />
     <Testimonials />
     <br/>
     <br/>
     <div className="mapdiv" style={{textAlign: 'center', justifyContent: 'center', marginTop: '20px'}}>
     <img id="logopic" style={{ width: '90%', height: 'auto', textAlign: 'center', justifyContent: 'center' }} src="https://i.postimg.cc/rs4VycR4/servicemap.png" alt="boutiquepic"/>
     </div>
     <Newsletter />
     <Footer />
    </div>
  )
}

export default Home