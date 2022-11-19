import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import Reservations from "../../components/users/reservations/reservations";
import UserTemplate from "../../templates/user-template";

const ReservationsPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="Reservations"/>
      <Spacer/>
      <Reservations/>
      <Spacer/>
    </UserTemplate>
  );
};

export default ReservationsPage;
