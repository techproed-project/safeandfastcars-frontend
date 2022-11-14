import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import RentPath from "../../components/users/about/rent-path/rent-path";
import WhyChooseUs from "../../components/users/about/why-choose-us/why-choose-us";
import PopularVehicles from "../../components/users/home/popular-vehicles/popular-vehicles";
import Slider from "../../components/users/home/slider/slider";
import UserTemplate from "../../templates/user-template";

const HomePage = () => {
  return (
    <UserTemplate>
      <Slider />
      <Spacer/>
      <PopularVehicles/>
      <Spacer/>
      <RentPath/>
      <Spacer/>
      <WhyChooseUs/>
      <Spacer/>
    </UserTemplate>
  );
};

export default HomePage;
