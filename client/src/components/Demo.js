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
        <div className='demo' id='demo' data-aos="flip-down">
            <div className='container'>
                <div className='col-1'>
                    <p id="p1">We know that your money is important to you. Let us give you the biggest bang for your buck.</p>
                    <p style={{fontSize:'35px'}}>Why Us?</p>
                    <p><CircleIcon/>Family Owned</p>
                    <p><CircleIcon/>Materials Made in he USA</p>
                    <p><CircleIcon/>Durable Steel Material</p>
                    <p><CircleIcon/>20+ Years of Experience</p>
                    <p><CircleIcon/>Competitive Prices</p>
                    <p><CircleIcon/>Fastest Installation Guaranteed</p>
                    <p><CircleIcon/>We Build Certified Buildings</p>
                    <p><CircleIcon/>Bilingual</p>
                    {/* <button className='button'>Get your free financial analysis</button> */}
                </div>
                <div className='col-2'>
                    <video controls muted width='570' height='320' src={video} title='Youtube video player' frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                </div>
            </div>
        </div>
    )
}

export default Demo
