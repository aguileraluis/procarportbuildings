import React from 'react';
import './Demo.css';
import video from '../videos/video.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CircleIcon from '@mui/icons-material/Circle';

AOS.init({
  duration: 2000
});

const Demo = () => {

    return (
        <div className='demo' id='demo' >
            <div className='container'>
                <div className='col-1' data-aos="flip-down">
                    
                    <h1 style={{fontSize:'35px'}}>Why Us?</h1>
                    <h3><CircleIcon/>Family Owned</h3>
                    <h3><CircleIcon/>Materials Made in he USA</h3>
                    <h3><CircleIcon/>Durable Steel Material</h3>
                    <h3><CircleIcon/>20+ Years of Experience</h3>
                    <h3><CircleIcon/>Competitive Prices</h3>
                    <h3><CircleIcon/>Fastest Installation Guaranteed</h3>
                    <h3><CircleIcon/>We Build Certified Buildings</h3>
                    <h3><CircleIcon/>Bilingual</h3>
                    <h5 id="p1">We provide 20 years of warranty on all material</h5>
                    {/* <button className='button'>Get your free financial analysis</button> */}
                </div>
                <div className='col-2' data-aos="flip-up">
                    <video controls muted width='570' height='320' src={video} title='Youtube video player' frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                </div>
            </div>
        </div>
    )
}

export default Demo