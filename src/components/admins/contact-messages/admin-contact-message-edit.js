import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMessage, getMessage } from "../../../api/contact-service";
import { question, toast } from "../../../utils/functions/swal";
import Loading from "../../common/loading/loading";

const AdminContactMessageEdit = () => {
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const { messageId } = useParams();

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getMessage(messageId);
      setMessage(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeMessage = async () => {
    setDeleting(true);
    try {
      await deleteMessage(messageId);
      toast("Message was deleted", "success");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeMessage();
      }
    });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <h2>{message.subject}</h2>
      <p>{message.body}</p>
      <hr />
      <p>
        <em>
          {message.name} - {message.email}
        </em>
      </p>
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            type="button"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting && <Spinner animation="border" size="sm" />} Delete
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default AdminContactMessageEdit;
