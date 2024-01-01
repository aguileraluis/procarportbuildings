import React from 'react'; 
import { Link } from 'react-router-dom';

const Product = ({item}) => {


  const scrollToTop = () => {
    window.scrollTo(0, 0)
  };

    return (
        <div className="card text-center shadow">
            <div>
                <img src={item.img} alt="itempicture" className="card-img-top"/>
            </div>

            <div className="card-body text-dark">
              <h4 className='card-title'>{item.title}</h4>
              <p className="card-text"></p>
              <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
              <button onClick={scrollToTop} className="btn btn-outline-success" style={{color: 'black', backgroundColor: '#d0f0fd', fontSize: '25px'}}><b>View Carport</b></button>
              </Link>
            </div>
        </div>
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