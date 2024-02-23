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
      <TextSection paragraph="The owner behind Pro Carport Buildings started working on steel buildings more than 13 years ago. Luis Morales started his career in 1997 building steel buildings with a local company in the area. He began his first builds in South Carolina, Virginia, and then his home, North Carolina. His missioin has always been to do a great job, and a fast job. Pro Carport Buildings is bringing the same vision to all of their customers that Luis has brought to his: FAST, EFFICIENT, and RELIABLE WORK. Our material comes from the best providers and they stand with 100% price back guarantee. Pro Carport Buildings is celebrating it's 5th year of inception since 2019. We pride ourselves in the great work that we do. You will absolutely love your new building or your money back guarantee. "/>
      <br/>
      <h4 style={{ textAlign: 'center', color: 'teal' }}>Thank you so much for your business, for your time, and for your friendship. Here at Pro Carport Buildings we invite you to be a part of our family, today, tomorrow and always.</h4>
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
