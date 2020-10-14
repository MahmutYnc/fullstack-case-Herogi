import api from "./api.js";

export const getUsers = async (setResponseData) => {
  const response = await api.get("/users");
  return setResponseData(response.data);
};
