import React from "react";

//import MiddleIntro from "./HomeComp/MiddleIntro";
import Hero from "../Components/HomeComp/Hero";

import FooterIntro from "../Components/HomeComp/FooterIntro";
import Intro from "../Components/HomeComp/Intro";

import "./Styles/Home.css";
const Home =()=>{
  return(
    <div>
      <Intro/>
      <Hero/>
      <FooterIntro/> 
    </div>
  );
};
export default Home;