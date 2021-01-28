import clienteAxios from "../config/AxiosConfig";

const createFactura = async (data) => {
  const resp = await clienteAxios.post("/facturas", data);
  return resp.data;
};

export { createFactura };
