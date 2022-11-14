import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import RentPath from "../../components/users/about/rent-path/rent-path";
import WhyChooseUs from "../../components/users/about/why-choose-us/why-choose-us";
import PageHeader from "../../components/users/common/page-header/page-header";
import UserTemplate from "../../templates/user-template";

const AboutPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="About Us"/>
      <Spacer/>
      <RentPath/>
      <Spacer/>
      <WhyChooseUs/>
      <Spacer/>
    </UserTemplate>
  );
};

export default AboutPage;
