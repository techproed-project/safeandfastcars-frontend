import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadReservations, getReservationsByPage } from "../../../api/reservation-service";

const columns = [
  {
    name: "Vehicle",
    selector: (row) => row.car.model,
  },
  {
    name: "Pick-Up",
    selector: (row) => row.pickUpLocation,
  },
  {
    name: "Drop-off",
    selector: (row) => row.dropOffLocation,
  },
  {
    name: "Price",
    selector: (row) => `$${row.totalPrice}`,
  },
];


const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [downloading, setDownloading] = useState(false);

  const navigate = useNavigate();

  const loadData = async (page, size) => {
    try {
      const resp = await getReservationsByPage(page, size);
      const { content, totalElements } = resp.data;
      setReservations(content);
      setTotalRows(totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    loadData(page - 1, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    loadData(page - 1, newPerPage);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const resp = await downloadReservations();
      fileDownload(resp.data,"reservations.xlsx");

    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleRowClick = (reservation) => { 
    navigate(`/admin/reservations/${reservation.id}`)
   }

  useEffect(() => {
    loadData(0, perPage);
  }, []);


  return <div>
  <Button
    variant="secondary"
    onClick={handleDownload}
    disabled={downloading}
  >
    {downloading && <Spinner animation="border" size="sm" />} Download Reservations
  </Button>

  <DataTable
    columns={columns}
    data={reservations}
    pagination
    paginationServer
    progressPending={loading}
    paginationTotalRows={totalRows}
    onChangePage={handlePageChange}
    onChangeRowsPerPage={handlePerRowsChange}
    onRowClicked={handleRowClick}
  />
</div>;
};

export default AdminReservations;
