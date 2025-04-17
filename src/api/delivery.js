import axios from "axios";

export const fetchDeliveryInfo = async (carrierCode, invoiceNumber) => {
  const url = `https://tracker.delivery/carriers/${carrierCode}/tracks/${invoiceNumber}`;
  const response = await axios.get(url);
  return response.data;
};
