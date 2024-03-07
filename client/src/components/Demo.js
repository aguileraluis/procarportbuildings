import React from 'react';
import './Demo.css';
import video from '../videos/video.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CircleIcon from '@mui/icons-material/Circle';

AOS.init({
  duration: 3000
});

const Demo = () => {

    return (
        <div className='demo' id='demo' data-aos="flip-down">
            <div className='container'>
                <div className='col-1'>
                    <p></p>
                    <p id="p1" style={{fontSize:'35px'}} data-aos="flip-right">Why Us?</p>
                    <p data-aos="flip-up"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>Family Owned</p>
                    <p data-aos="flip-down"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>Materials Made in the USA</p>
                    <p data-aos="flip-up"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>Durable Steel Material</p>
                    <p data-aos="flip-down"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>10 Year Warranty on 14ga. 2 1/2" Framing</p>
                    <p data-aos="flip-up"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>Competitive Prices</p>
                    <p data-aos="flip-down"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>Fastest Installation Guaranteed</p>
                    <p data-aos="flip-up"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>We Build Certified Buildings</p>
                    <p data-aos="flip-down"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>1 YEAR WORKMANSHIP WARRANTY (Limited)</p>
                    <p data-aos="flip-up"><CircleIcon style={{fontSize: '10px', marginRight: '5px'}}/>Bilingual</p>
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
