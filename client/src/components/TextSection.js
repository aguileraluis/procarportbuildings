import React from 'react';


export default function TextSection({title, paragraph, paragraph1, paragraph2}) {
  return (
    <div className="section-title">  
        <h1 data-aos="fade-left"
        data-aos-duration="1200"
        data-aos-anchor-placement="center bottom"
        style={{fontSize: '2.5rem', color: 'orange', marginLeft: '1rem', marginRight: '1rem'}}        
        >{title}</h1>
       
        <p data-aos="fade-right"
          data-aos-duration="1300"
          data-aos-anchor-placement="center bottom"
          style={{fontSize: '1.5rem', color: 'black', marginLeft: '1rem', marginRight: '1rem'}}
        >{paragraph1}</p>
        <p data-aos="fade-right"
          data-aos-duration="1300"
          data-aos-anchor-placement="center bottom"
          style={{fontSize: '1.5rem', color: 'black', marginLeft: '1rem', marginRight: '1rem'}}
        >{paragraph}</p>
        <p data-aos="fade-right"
          data-aos-duration="1300"
          data-aos-anchor-placement="center bottom"
          style={{fontSize: '1.5rem', color: 'black', marginLeft: '1rem', marginRight: '1rem'}}
        >{paragraph2}</p>
    </div>
  )
}
