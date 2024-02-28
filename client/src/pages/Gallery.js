import React from 'react'
import TextSection from '../components/TextSection';
import Photos from '../components/Photos';
import Navbar from '../components/Navigation';
import Footer from '../components/Footer';

const Gallery = () => {


  const galleryImagesTwo = [
    {
      img: 'https://i.postimg.cc/hPQNdPTJ/403012-Garage.jpg'
    },
    {
      img: 'https://i.postimg.cc/RhksRKKW/carolinabarn-fotor-2024022712307.jpg'
    },
    {
      img: 'https://i.postimg.cc/SRNNKbHQ/carport6-fotor-2024022712163.png'
    },
    {
      img: 'https://i.postimg.cc/76frt1G9/carport12-fotor-20240227121112.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/1XFhs9KN/carport15-fotor-20240227122115.png'
    },
    {
      img: 'https://i.postimg.cc/cL0yGGtr/carport16-fotor-20240227121811.png'
    },
    {
      img: 'https://i.postimg.cc/d3rXg5q2/carport18-fotor-20240227121316.png'
    },
    {
      img: 'https://i.postimg.cc/65xFCx0Y/carport19-1-fotor-2024022712250.jpg'
    },
    {
      img: 'https://i.postimg.cc/Z5TgDPXN/carport19-fotor-2024022712271.jpg'
    },
    {
      img: 'https://i.postimg.cc/zDKczPrW/carport20-fotor-20240227122543.jpg'
    },
    {
      img: 'https://i.postimg.cc/fyXFWRYd/carport31-fotor-20240227122911.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/3J3nK895/Garage.jpg'
    },
    {
      img: 'https://i.postimg.cc/sf440Fzn/IMG-4964-fotor-20240223163224.jpg'
    },
    {
      img: 'https://i.postimg.cc/5yKYdSnt/IMG-5068-fotor-20240223162519.jpg'
    },
    {
      img: 'https://i.postimg.cc/g2ZwQRRY/IMG-5262-fotor-2024022685533.jpg'
    },
    {
      img: 'https://i.postimg.cc/43vYNgBq/IMG-5284-fotor-20240223165928.jpg'
    },
    {
      img: 'https://i.postimg.cc/cHcQ1VFX/IMG-6784-fotor-20240223161726.jpg'
    },
    {
      img: 'https://i.postimg.cc/c1krJTBx/IMG-6847-fotor-20240223161153.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/pdvdSSRZ/IMG-6901-fotor-20240223165447.jpg'
    },
    {
      img: 'https://i.postimg.cc/s2J2CJ2R/IMG-7166-fotor-20240223165153.jpg'
    },
    {
      img: 'https://i.postimg.cc/ncQchxL2/IMG-7189-fotor-20240223164848.jpg'
    },
    {
      img: 'https://i.postimg.cc/59C3D2dS/IMG-7196-fotor-20240223164350.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/ydbs7p42/IMG-7391-fotor-20240223163955.jpg'
    },
    {
      img: 'https://i.postimg.cc/50Tys20H/Screenshot-27-2-2024-1445-procarportbuildings-onrender-com-fotor-20240227143215.jpg'
    },
    {
      img: 'https://i.postimg.cc/q777036h/Screenshot-27-2-2024-1471-procarportbuildings-onrender-com-fotor-20240227143838.jpg'
    },
    {
      img: 'https://i.postimg.cc/8zppB6HK/Screenshot-27-2-2024-14124-procarportbuildings-onrender-com-fotor-20240227142732.jpg'
    }, 
    {
      img: 'https://i.postimg.cc/yNW72C20/Screenshot-27-2-2024-14231-procarportbuildings-onrender-com-fotor-20240227142920.jpg'
    },
    {
      img: 'https://i.postimg.cc/rpbqkYL3/Screenshot-27-2-2024-14329-procarportbuildings-onrender-com-fotor-20240227143111.jpg'
    },
    {
      img: 'https://i.postimg.cc/3NQ7y4NZ/Screenshot-27-2-2024-14430-procarportbuildings-onrender-com-fotor-20240227143321.jpg'
    },
    {
      img: 'https://i.postimg.cc/3J7YYvP8/Screenshot-27-2-2024-14515-procarportbuildings-onrender-com-fotor-20240227143439.jpg'
    },
    {
      img: 'https://i.postimg.cc/x1p2vFq8/Screenshot-27-2-2024-14636-procarportbuildings-onrender-com-fotor-2024022714369.png'
    }, 
    {
      img: 'https://i.postimg.cc/9f59QzbW/Screenshot-27-2-2024-14733-procarportbuildings-onrender-com-fotor-20240227143953.jpg'
    },
    {
      img: '  https://i.postimg.cc/W3gcPN8q/Screenshot-27-2-2024-14829-procarportbuildings-onrender-com-fotor-20240227144713.jpg'
    }
  
  ]

  return (

    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <Navbar />
      {/* <img id="logopic" style={{ width: '30%', height: 'auto', textAlign: 'center', justifyContent: 'center', marginTop: '-3%', marginBottom: '-3%' }} src="https://i.postimg.cc/KvpGY2FL/Attachment-1.png" alt="boutiquepic" /> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <h5 style={{ textAlign: 'center', color: 'teal', marginLeft: '10%', marginRight: '10%' }}>Call us now or shop through our buildings!</h5>

      <TextSection paragraph="See our gallery bellow" />
      <Photos galleryImages={galleryImagesTwo} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4 style={{ textAlign: 'center', color: 'teal' }}>Thank you for visiting our website! Call us now for a free quote!</h4>
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
