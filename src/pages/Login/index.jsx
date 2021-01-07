import React, { useContext, useState } from "react";

import { Form, Button, Input, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./Login.css";

import LogoHarrison from "../../img/logo-harrison.min.png";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

const imgHotel =
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=387&q=80";

const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [loadSubmit, setLoadSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z]*$/, "Solo se admiten letras.")
      .required("Usuario requerido."),
    password: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z0-9]*$/, "Solo se admiten letras y números.")
      .required("Contraseña requerida."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (value) => {
      setLoadSubmit(true);
      setTimeout(() => {
        setLoadSubmit(false);
        dispatch({
          type: types.login,
          payload: {
            name: "Aimar Andony",
          },
        });
        localStorage.setItem("user", JSON.stringify({ logged: true }));
        history.push("/reserva");
      }, 2000);
      console.log(value);
    },
  });

  return (
    <div className="Login">
      <div className="content">
        <div className="left">
          <img src={imgHotel} alt="Hotel Example" />
        </div>
        <div className="right">
          <div className="logo">
            <img src={LogoHarrison} alt="logo" />
          </div>
          <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <Form.Item label="Usuario:" required>
              <Input
                prefix={<UserOutlined />}
                placeholder="Ingrese su usuario"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="error-field">{formik.errors.username}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Contraseña:" required>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Ingrese su contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="error-field">{formik.errors.password}</div>
              ) : null}
            </Form.Item>
            <Form.Item>
              <Button
                loading={loadSubmit}
                type="primary"
                htmlType="submit"
                block
              >
                Ingresar
              </Button>
            </Form.Item>
          </Form>
          <div className="information">
            <Divider>
              <InfoCircleOutlined />
            </Divider>
            <p>
              Sistema de Reserva y Recepción de Habitaciones -{" "}
              <b>Hotel Harrison</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
