import React from 'react'
import TextSection from '../components/TextSection';
import Photos from '../components/Photos';
import Navbar from '../components/Navigation';
import Footer from '../components/Footer';

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

    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <Navbar />
      {/* <img id="logopic" style={{ width: '30%', height: 'auto', textAlign: 'center', justifyContent: 'center', marginTop: '-3%', marginBottom: '-3%' }} src="https://i.postimg.cc/KvpGY2FL/Attachment-1.png" alt="boutiquepic" /> */}
      <br/>
      <br/>
      <h5 style={{ textAlign: 'center', color: 'teal', marginLeft: '10%', marginRight: '10%' }}> These are a few of the buildings that we have built.</h5>

      <h5 style={{ textAlign: 'center', color: 'teal', marginLeft: '10%', marginRight: '10%' }}>Call us now or shop through our buildings now!</h5>

      <TextSection paragraph="See our gallery bellow" />
      <Photos galleryImages={galleryImagesTwo} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4 style={{ textAlign: 'center', color: 'teal' }}>Thank you!</h4>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default Gallery;
