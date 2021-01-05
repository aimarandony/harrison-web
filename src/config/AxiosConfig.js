import Axios from "axios";

const URL = "https://hotel-harrison-backend.herokuapp.com/";

const clienteAxios = Axios.create({
  baseURL: URL,
});

export default clienteAxios;
