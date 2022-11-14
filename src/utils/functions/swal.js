import Swal from "sweetalert2";

export const toast = (title, icon = "info") => {
  return Swal.fire({
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const question = (title, text = "") => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
  });
};
