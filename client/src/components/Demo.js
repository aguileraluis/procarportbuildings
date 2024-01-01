import React from 'react';
import './Demo.css';
import video from '../videos/video.mp4';

const Demo = () => {
    return (
        <div className='demo' id='demo'>
            <div className='container'>
                <div className='col-1'>
                    <p id="p1">We know that your money is important to you. Let us give you the biggest bang for your buck.</p>
                    <p style={{fontSize:'35px'}}>One Philosophy</p>
                    <p>Our guiding principle is to provide the strongest, most reliable, and fastest carport building for you and your loved ones.</p>
                    {/* <button className='button'>Get your free financial analysis</button> */}
                </div>
                <div className='col-2'>
                    <iframe width='570' height='320' src={video} title='Youtube video player' frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                </div>
            </div>
        </div>
    )
}

export default Demo