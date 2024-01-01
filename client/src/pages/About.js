import React from 'react';
import Navbar from '../components/Navigation';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import TextSection from '../components/TextSection';

const About = () => {
  return (
    <div>
    <Navbar /> 
    <Announcement />
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      <img id="logopic" style={{ width: '30%', height: 'auto', textAlign: 'center', justifyContent: 'center', marginTop: '-3%', marginBottom: '-3%'}} src="https://i.postimg.cc/KvpGY2FL/Attachment-1.png" alt="boutiquepic"/>
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}> We have a variety of wedding and Quinceañera / Sweet 16 dresses. In addition, we carry dresses for bridesmaids and for prom! Please tell your loved ones about us too, they may find something they love! Thank you.</h5>
      
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}>Check us out at our page!</h5>
      
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}><a style={{color: 'black'}}href="//www.jloubridalboutique.com/">J Lou Bridal Boutique</a></h5>
      <TextSection paragraph="If you have a special event we have it all from tuxes to dresses. Contact the Boutique at 336-615-5173 for more information."/>
      <br/>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>We invite you to come and see the boutique for yourself. You WILL find something that you will fall in love with.</h4>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>We want you to feel like you are in "heaven".</h4>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>Thank you!</h4>
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
