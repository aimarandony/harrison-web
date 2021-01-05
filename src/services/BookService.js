  
import clienteAxios from "../config/AxiosConfig";

const getBooks = async () => {
  const resp = await clienteAxios.get("/reservas");
  return resp.data;
};

export { getBooks };