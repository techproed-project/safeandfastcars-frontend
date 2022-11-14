import React, { useState } from "react";
import UserTemplate from "../../templates/user-template";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import VehicleDetails from "../../components/users/vehicle-details/vehicle-details";

const VehicleDetailsPage = () => {
  const [title, setTitle] = useState("");
  return (
    <UserTemplate>
      <PageHeader title={title}/>
      <Spacer/>
      <VehicleDetails setTitle={setTitle}/>
      <Spacer/>
    </UserTemplate>
  );
};

export default VehicleDetailsPage;
