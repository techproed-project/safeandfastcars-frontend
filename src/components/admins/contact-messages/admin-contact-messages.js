import React, { useEffect, useState } from "react";
import Loading from "../../common/loading/loading";
import {useNavigate} from "react-router-dom"
import { getMessagesByPage } from "../../../api/contact-service";
import DataTable from "react-data-table-component"

const columns = [
  {
    name:"Subject",
    selector:(row)=>row.subject,
  },
  {
    name:"Visitor",
    selector:(row)=>row.name,
  }
]
const AdminContactMessages = () => {
  const [messages,setMessages] = useState([]);
  const [totalRows,setTotalRows] = useState(0);
  const [perPage,setPerPage] = useState(10);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async (page) => { 
    try {
      const resp = await getMessagesByPage(page,perPage);
      setMessages(resp.data.content);
      setTotalRows(resp.data.totalElements);
    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false);
    }
   }
   useEffect(() => {
    loadData();
   }, [])
   

  const handlePerRowsChange = (newPerPage, page) => { 
    loadData(page-1);
    setPerPage(newPerPage);
   }

   const handlePageChange = (page) => { 
     loadData(page-1);
    }

    const handleRowClick = (row) => { 
      navigate(`/admin/messages/${row.id}`);
    }

  return (
    <DataTable
			columns={columns}
			data={messages}
			progressPending={loading}
      progressComponent={<Loading/>}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
      onRowClicked={handleRowClick}
		/>

  )
};

export default AdminContactMessages;
