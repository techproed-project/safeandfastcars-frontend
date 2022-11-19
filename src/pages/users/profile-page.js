import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import Profile from "../../components/users/profile/profile";
import UserTemplate from "../../templates/user-template";

const ProfilePage = () => {

  
  return (
    <UserTemplate>
      <PageHeader title="Profile"/>
      <Spacer/>
      <Profile/>
      <Spacer/>
    </UserTemplate>
  );
};

export default ProfilePage;
