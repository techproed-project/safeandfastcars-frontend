import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import {
  downloadVehicles,
  getVehiclesByPage,
} from "../../../api/vehicle-service";
import Loading from "../../common/loading/loading";

const columns = [
  {
    name: "Model",
    selector: (row) => row.model,
  },
  {
    name: "Age",
    selector: (row) => row.age,
  },
  {
    name: "Price/hour",
    selector: (row) => row.pricePerHour,
    format: (row) => `$${row.pricePerHour.toLocaleString()}`,
  },
];

const AdminVehicles = () => {
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const resp = await downloadVehicles();
      fileDownload(resp.data, `vehicles-${new Date().valueOf()}.xlsx`);
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const loadData = async (page = 0, perpage = perPage) => {
    try {
      setLoading(true);
      const resp = await getVehiclesByPage(page, perpage);
      setVehicles(resp.data.content);
      setTotalRows(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    // Data table 1 tabanlı, bizim api 0 tabanlı
    loadData(page - 1);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    loadData(page - 1, newPerPage);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleEdit = (row) => {
    navigate(`/admin/vehicles/${row.id}`);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" as={Link} to="/admin/vehicles/new">
          New Vehicle
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading && <Spinner animation="border" size="sm" />}
          Download List
        </Button>
      </ButtonGroup>

      <DataTable
        columns={columns}
        data={vehicles}
        progressPending={loading}
        progressComponent={<Loading />}
        onRowClicked={handleEdit}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default AdminVehicles;
