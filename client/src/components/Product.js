import React from 'react'; 
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 3000
});

const Container = styled.div`
  flex: 1;
  text-align: center !important;
  height: 60vh;
  width: 40vw;
  position: relative;
  margin-top: 20px;
  margin-left: 130px;
  margin-bottom: 260px;
  ${mobile({ marginBottom: '-65px', width: '98vw', textAlign: 'center', marginLeft: '22px'})}
`;

const Image = styled.img`
  width: 90%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "50vh" , marginRight: '30px', textAlign: 'center'})}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ textAlign: 'center', paddingRight: '30px'})}
`;

const Title = styled.h1`
    font-size: 60px;
    color: white;
    font-weight: bolder;
    margin-bottom: 20px;
    text-align: center;
    ${mobile({ fontSize: '30px', textAlign: 'center' })}
`;

const Button = styled.button`
    font-size: 40px;
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
      ${mobile({ fontSize: '25px' })}
`;

const Product = ({item}) => {

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  };

    return (
    <Container data-aos="flip-right">
      <Link to={`/product/${item._id}`}>
      <Image src={`${item.img}`} />
      <Info>
        <Title>{`${item.title}`}</Title>
        <Button onClick={scrollToTop}>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
    );
}

export default Product;















// import {
//   FavoriteBorderOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from '@mui/icons-material';
// import styled from "styled-components";
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { mobile } from "../responsive";

// const Info = styled.div`
//     opacity: 0;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.2);
//     z-index: 3;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.5s ease;
//     cursor: pointer;
//   `;

// const Infotwo = styled.div`
//     position: inherit;
//     top: 0 !important;
//     width: 100%;
//     height: 100%;
//     display: block;
//     color: 'silver';
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     z-index: 3;
// `

// const Title = styled.h1`
// opacity: 5;
// font-size: 60px;
// color: teal;
// top: -6;
// background-color: silver;
// font-weight: bolder;
// margin-bottom: 20px;
// text-align: center;
// z-index: 3;
// ${mobile({ fontSize: '30px' })}
// `;

// const Container = styled.div`
//     flex: 1;
//     margin: 50px;
//     min-width: 280px;
//     height: 350px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #f5fbfd;
//     position: relative;
  
//     &:hover ${Info}{
//       opacity: 1;
//     }
//   `;

// const Image = styled.img`
//     height: 100%;
//     width: 100%;
//     z-index: 2;
//   `;

// const Icon = styled.div`
//     width: 0px;
//     height: 0px;
//     border-radius: 50%;
//     background-color: white;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 10px;
//     transition: all 0.5s ease;
//     &:hover {
//       background-color: #e9f5f5;
//       transform: scale(1.1);
//     }
//   `;

// const Product = ({ item }) => {

//   return (
//     <>
//      <Container>
//       <Image src={item.img} />
//       <Info>
//         <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
//           <Icon>
//             <h1 style={{ color: 'white', textDecoration: 'none' }}>{item.title}</h1>
//           </Icon>
//         </Link>
//       </Info>
//     <Infotwo>
//     <Title>{item.title}</Title>
//   </Infotwo>
//   </Container>
//     </>
   
//   );
// };

// export default Product;