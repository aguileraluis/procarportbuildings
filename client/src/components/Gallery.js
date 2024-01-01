import React from 'react'
import TextSection from '../components/TextSection';
import Photos from '../components/Photos';

const Gallery = () => {

  const galleryImagesTwo = [
    {
      img: 'https://i.postimg.cc/ncg7RSn3/carport.jpg'
    },
    {
      img: 'https://i.postimg.cc/gJtrwrJg/carport2.jpg'
    },
    {
      img: 'https://i.postimg.cc/yYZWd1zT/carport3.jpg'
    },
    {
      img: 'https://i.postimg.cc/pLQTfsrh/carport4.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/Jh4ktfx4/carport5.jpg'
    },
    {
      img: 'https://i.postimg.cc/65CKGTbY/carport6.jpg'
    },
    {
      img: 'https://i.postimg.cc/T1rsh52b/carport7.jpg'
    },
    {
      img: 'https://i.postimg.cc/KzTqs3MW/carport8.jpg'
    },
    {
      img: 'https://i.postimg.cc/HsdZBxsS/carport9.jpg'
    },
    {
      img: 'https://i.postimg.cc/VLg7T8Jz/carport10.jpg'
    },
    {
      img: 'https://i.postimg.cc/cCZm99ZK/carport11.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/wxcFypcD/carport12.jpg'
    },
    {
      img: 'https://i.postimg.cc/JhHCMnXN/carport13.jpg'
    },
    {
      img: 'https://i.postimg.cc/jq40sBDF/carport14.jpg'
    },
    {
      img: 'https://i.postimg.cc/ncV8MT7c/carport15.jpg'
    },
    {
      img: 'https://i.postimg.cc/FH12VRDM/carport16.jpg'
    },
    {
      img: 'https://i.postimg.cc/V69TkbkC/carport17.jpg'
    },
    {
      img: 'https://i.postimg.cc/g2wT670d/carport18.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/BQjghKfB/carport19.jpg'
    },
    {
      img: 'https://i.postimg.cc/DzTPypJx/carport20.jpg'
    },
    {
      img: 'https://i.postimg.cc/hjCLsSCY/carport21.jpg'
    },
    {
      img: 'https://i.postimg.cc/jdnH6Yy8/carport22.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/sxQhJ5GB/carport23.jpg'
    },
    {
      img: 'https://i.postimg.cc/sDfxYtqk/carport24.jpg'
    },
    {
      img: 'https://i.postimg.cc/Rh6PyPD4/carport25.jpg'
    },
    {
      img: 'https://i.postimg.cc/zD45B45w/carport26.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/s2nCRNwh/carport27.jpg'
    },
    {
      img: 'https://i.postimg.cc/MZV37LVm/carport28.jpg'
    },
    {
      img: 'https://i.postimg.cc/VvkSkp8P/carport29.jpg'
    },
    {
      img: 'https://i.postimg.cc/rpTwp31Z/carport30.jpg'
    },
    {
      img: 'https://i.postimg.cc/zBXDChPn/carport31.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/K8PmCf6P/carport32.jpg'
    }
  ]

  return (
    <div style={{textAlign: 'center', justifyContent: 'center'}}>
      <img id="logopic" style={{ width: '30%', height: 'auto', textAlign: 'center', justifyContent: 'center', marginTop: '-3%', marginBottom: '-3%'}} src="https://i.postimg.cc/KvpGY2FL/Attachment-1.png" alt="boutiquepic"/>
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}> We have a variety of wedding and Quinceañera / Sweet 16 dresses. In addition, we carry dresses for bridesmaids and for prom! Please tell your loved ones about us too, they may find something they love! Thank you.</h5>
      
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}>Check us out at our page!</h5>
      
      <h5 style={{ textAlign: 'center', color: 'darkorange', marginLeft: '10%', marginRight: '10%' }}><a style={{color: 'black'}}href="//www.jloubridalboutique.com/">J Lou Bridal Boutique</a></h5>
      <TextSection paragraph="If you have a special event we have it all from tuxes to dresses. Contact the Boutique at 336-615-5173 for more information."/>
      <Photos galleryImages={galleryImagesTwo} />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>We invite you to come and see the boutique for yourself. You WILL find something that you will fall in love with.</h4>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>We want you to feel like you are in "heaven".</h4>
      <h4 style={{ textAlign: 'center', color: 'darkorange' }}>Thank you!</h4>
      <br/>
      <br/>
      <br/>
      <br/>
    <br/>
  </div>
  )
}

export default Gallery;
