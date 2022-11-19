import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";
import ReservationDetails from "../../components/users/reservations/reservation-details";
import UserTemplate from "../../templates/user-template";

const ReservationDetailsPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="Reservations" />
      <Spacer />
      <ReservationDetails/>
      <Spacer />
    </UserTemplate>
  );
};

export default ReservationDetailsPage;
