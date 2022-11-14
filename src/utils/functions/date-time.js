import moment from "moment";

export const getCurrentDate = () => {
  return moment().format("YYYY-MM-DD");
};

export const getDate = (dateTime) => {
  return moment(dateTime).format("YYYY-MM-DD");
};

export const combineDateAndTime = (date, time) => {
  return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
};
