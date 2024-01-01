import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    return (
        <div className='testimonials' id='testimonials'>
            <div className='container'>
                <h2 className="testi">Testimonials</h2>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <p style={{fontSize: '20px'}}>"Thank you Pro Carport Buildings! My garage was built on Sept. 15th 2023 and I am more than amazed at how fast they came in, built it and were on their way. I love it!"</p>
                        <p><span>- Alex Johnson ⭐⭐⭐⭐⭐</span></p>
                        <p>Columbia, South Carolina</p>
                    </div>                  
                    <div className='card'>
                        <p style={{fontSize: '20px'}}>"It was super important to me to find someone who knew what they were doing when I was looking for a build for my boat. These guys came in and built this thing in no time. I love it! Now I have somewhere to keep my boat and I won't get wet. Thank you so much!"</p>
                        <p><span>- Brandon Fowler ⭐⭐⭐⭐⭐</span></p>
                        <p>Lake Norman, North Carolina</p>
                    </div>
                    <div className='card'>
                        <p style={{fontSize: '20px'}}>"This is my fourth building with these guys. They really do know what they are doing. Don't worry about losing your money. They will take care of you. Thanks guys."</p>
                        <p><span>- Peter Weber ⭐⭐⭐⭐⭐</span></p>
                        <p>Galax, Virginia</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Testimonials;