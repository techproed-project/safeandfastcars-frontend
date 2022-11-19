import moment from "moment";

export const getCurrentDate = () => {
  return moment().format("YYYY-MM-DD");
};

export const getDate = (dateTime) => {
  return moment(dateTime).format("YYYY-MM-DD");
};

export const getTime = (dateTime) => {
  return moment(dateTime).format("HH:mm");
};

export const combineDateAndTime = (date, time) => {
  return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
};

export const formatDateTimelll = (dateTime) => {
  return moment(dateTime).format("lll");
};
