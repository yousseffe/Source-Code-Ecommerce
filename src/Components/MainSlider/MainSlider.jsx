import React from 'react'
import Slider from 'react-slick';
import Slider1 from '../../assets/images/slider1.png';
import Slider2 from '../../assets/images/slider2.png';
import Slider3 from '../../assets/images/slider3.png';
import Slider4 from '../../assets/images/slider4.png';
import "./MainSLider.css"
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <Slider {...settings} className='mt-6 p-0' >

      <img src={Slider1} alt="" />
      <img src={Slider2} alt="" />
      <img src={Slider3} alt="" />
      <img src={Slider4} alt="" />
    </Slider>
  )
}
