import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { downloadVehicles, getVehiclesByPage } from "../../../api/vehicle-service";

const columns = [
  {
    name:"Model",
    selector: (row)=>row.model
  },
  {
    name:"Age",
    selector: (row)=>row.age
  },
  {
    name:"Price/hour",
    selector: (row)=>row.pricePerHour
  }
]


const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [downloading, setDownloading] = useState(false);

  const navigate = useNavigate();

  const loadData = async (page, size) => {
    try {
      const resp = await getVehiclesByPage(page, size);
      const { content, totalElements } = resp.data;
      setVehicles(content);
      setTotalRows(totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const resp = await downloadVehicles();
      fileDownload(resp.data,"vehicles.xlsx");

    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePageChange = (page) => {
    loadData(page - 1, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    loadData(page - 1, newPerPage);
  };

  const handleRowClick = (vehicle) => { 
    navigate(`/admin/vehicles/${vehicle.id}`)
   }

  useEffect(() => {
    loadData(0, perPage);
  }, []);

  return (
    <div>
      <Button variant="primary" as={Link} to="/admin/vehicles/new">
        New Vehicle
      </Button>
      
      <Button
        variant="secondary"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading && <Spinner animation="border" size="sm" />} Download Vehicles
      </Button>

      <DataTable
        columns={columns}
        data={vehicles}
        pagination
        paginationServer
        progressPending={loading}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        onRowClicked={handleRowClick}
      />
    </div>
  );
};

export default AdminVehicles;
