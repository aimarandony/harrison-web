import clienteAxios from "../config/AxiosConfig";

const createConsumo = async (data) => {
  const resp = await clienteAxios.post("/consumos", data);
  return resp.data;
};

export { createConsumo };
