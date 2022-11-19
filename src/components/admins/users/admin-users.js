import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadUsers, getUsers } from "../../../api/user-service";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Roles",
    selector: (row) => row.roles,
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [downloading, setDownloading] = useState(false);

  const navigate = useNavigate();

  const loadData = async (page, size) => {
    try {
      const resp = await getUsers(page, size);
      const { content, totalElements } = resp.data;
      setUsers(content);
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
      const resp = await downloadUsers();
      fileDownload(resp.data,"users.xlsx");

    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleRowClick = (user) => { 
    navigate(`/admin/users/${user.id}`)
   }

  useEffect(() => {
    loadData(0, perPage);
  }, []);

  return (
    <div>
      <Button
        variant="secondary"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading && <Spinner animation="border" size="sm" />} Download Users
      </Button>

      <DataTable
        columns={columns}
        data={users}
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

export default AdminUsers;
