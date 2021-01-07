import clienteAxios from "../config/AxiosConfig";

const getBooks = async () => {
  const resp = await clienteAxios.get("/reservas");
  return resp.data;
};

const findBooksByRangeDate = async (data) => {
  const resp = await clienteAxios.post("/reservas/find-dateTime", data);
  return resp.data;
};

export { getBooks, findBooksByRangeDate };
