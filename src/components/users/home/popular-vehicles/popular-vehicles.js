import React, { useState, useEffect } from "react";
import { getVehiclesByPage } from "../../../../api/vehicle-service";
import Loading from "../../../common/loading/loading";
import Spacer from "../../../common/spacer/spacer";
import SectionHeader from "../../common/section-header/section-header";
import PopularVehicle from "./popular-vehicle";
import VehiclesBar from "./vehicles-bar";

const PopularVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [activeVehicle, setActiveVehicle] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const resp = await getVehiclesByPage();
      const data = resp.data.content;
      setVehicles(data);
      if (data.length > 0) setActiveVehicle(data[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <SectionHeader
        title="Popular Vehicle Models"
        subtitle="Lux &amp; economic"
        desc="To contribute to positive change and achieve our sustainability goals with many extraordinary"
      />
      <Spacer />
      {loading ? <Loading/> : (
        <>
          <VehiclesBar
            vehicles={vehicles}
            activeVehicle={activeVehicle}
            setActiveVehicle={setActiveVehicle}
          />
          <Spacer height={50} />
          <PopularVehicle activeVehicle={activeVehicle} />
        </>
      )}
    </div>
  );
};

export default PopularVehicles;
