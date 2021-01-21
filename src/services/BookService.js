import clienteAxios from "../config/AxiosConfig";

const getBooks = async () => {
  const resp = await clienteAxios.get("/reservas");
  return resp.data;
};

const getBookById = async (id) => {
  const resp = await clienteAxios.get(`/reservas/${id}`);
  return resp.data;
};

const createBook = async (data) => {
  const resp = await clienteAxios.post("/reservas", data);
  return resp.data;
};

const changeBookStatus = async (data, id) => {
  const resp = await clienteAxios.patch(`/reservas/${id}`, data);
  return resp.data;
};

const findBooksByRangeDate = async (data) => {
  const resp = await clienteAxios.post("/reservas/find-dateTime", data);
  return resp.data;
};

export { getBooks, getBookById, createBook, findBooksByRangeDate, changeBookStatus };
