import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Category({ item }) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div onClick={handleClick} className='col-md-3 product p-3 rounded-3'>
      <Link to={`/Category/${item._id}`}>
        <img src={item.image} className='w-100' height={500} alt="" />
        <h3>{item.name}</h3>
      </Link>
    </div>
  );
}
