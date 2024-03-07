import React from 'react';
import Navbar from '../components/Navigation';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import TextSection from '../components/TextSection';

const About = () => {
  return (
    <div>
    <Navbar /> 
    
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      {/* <img id="logopic" style={{ width: '30%', height: 'auto', textAlign: 'center', justifyContent: 'center', marginTop: '-3%', marginBottom: '-3%'}} src="https://i.postimg.cc/KvpGY2FL/Attachment-1.png" alt="boutiquepic"/> */}
      <Announcement />
      <br />
      <br />
      {/* <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}> We have a variety of wedding and Quinceañera / Sweet 16 dresses. In addition, we carry dresses for bridesmaids and for prom! Please tell your loved ones about us too, they may find something they love! Thank you.</h5> */}
      
      {/* <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}>Check us out at our page!</h5>
      
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}><a style={{color: 'black'}}href="//www.jloubridalboutique.com/">J Lou Bridal Boutique</a></h5> */}
          <h1 style={{ textAlign: 'center', color: 'teal' }}>Since 2005</h1>
      <TextSection paragraph="

Welcome to ProCarport Buildings, a family-owned metal manufacturer with over a decade in the carport industry. Our mission is to provide FAST, EFFICIENT, and RELIABLE work to all of our customers. At ProCarport Buildings, we understand the importance of quality, reliability and exceptional service. Contact us today to help you create your next project!
"/>
      <br/>
      <h1 style={{ textAlign: 'center', color: 'teal', textTransform: 'capitalize'}}>
WE WELCOME YOU TO BECOME PART OF OUR FAMILY OF QUALITY & EXCELLENCE.
</h1>
      {/* <h4 style={{ textAlign: 'center', color: 'darkorange' }}>We want you to feel like you are in "heaven".</h4>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>Thank you!</h4> */}
      <br/>
      <br/>
      <br/>
      <br/>_
    <br/>
    <Footer />
  </div>
  </div>
)
}

export default About;
