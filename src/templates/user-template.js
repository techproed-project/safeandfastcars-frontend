import React from "react";
import Footer from "../components/users/common/footer/footer";
import Header from "../components/users/common/header/header";

const UserTemplate = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserTemplate;
