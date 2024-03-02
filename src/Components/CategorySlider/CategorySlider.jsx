import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {

  const [categories, setCategories] = useState([]);
  async function GetCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/');
    setCategories(data.data);
  }
  useEffect(() => {
    GetCategories()
  }, [])
  useEffect(() => {
  }, [categories]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
    ],
  };
  return (
    <>
      <div className='  my-5'>
        <h2 className='m-4'>Shop popular Category</h2>
        <Slider {...settings} className='' >
          {
            categories.map((item) => {
              return <img src={item.image} alt="" height={300} key={item._id} />
            })
          }
        </Slider>
      </div>
    </>
  )
}
