import React from 'react'; 

const Card = props => {
    return (
        <div className="card text-center">
            <div className="overflow">
                <img src={item.img} alt="itempicture" />
            </div>
        </div>
    );
}

export default Card;