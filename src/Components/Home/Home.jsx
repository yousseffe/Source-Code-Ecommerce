import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider"
import Products from '../Products/Products'
export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
