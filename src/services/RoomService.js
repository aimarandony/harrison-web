  
import clienteAxios from "../config/AxiosConfig";

const getRooms = async () => {
  const resp = await clienteAxios.get("/habitaciones");
  return resp.data;
};

export { getRooms };