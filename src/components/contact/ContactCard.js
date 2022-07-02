import React from 'react';
import { Link } from 'react-router-dom';

const ContactCard = ({ id, name, species, image }) => {
  return (
    <Link to={`/contact/${id}`} >
      <div className='contact-card'>
        <div className='image'>
          <img className='character-img' src={image} height="40px" />
        </div>
        <div className="info">
          <label>{name}</label>
          <label>{species}</label>
        </div>
      </div>
    </Link>
  );
};

export default ContactCard;