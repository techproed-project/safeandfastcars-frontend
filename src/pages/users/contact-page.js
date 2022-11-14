import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import ContactForm from "../../components/users/contact/contact-form/contact-form";
import Map from "../../components/users/contact/map/map";
import UserTemplate from "../../templates/user-template";

const ContactPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="Contact Us"/>
      <Spacer/>
      <ContactForm/>
      <Spacer/>
      <Map/>
      <Spacer/>
    </UserTemplate>
  );
};

export default ContactPage;
