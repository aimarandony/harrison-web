import { EyeOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Descriptions,
  Drawer,
  Input,
  PageHeader,
  Table,
  Tag,
  Form,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getBooks,
  getBookById,
  changeBookStatus,
} from "../../services/BookService";

import moment from "moment";
import "moment/locale/es";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createFactura } from "../../services/FacturaService";

const CheckOut = () => {
  moment.locale("es");

  const [loading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [book, setBook] = useState({});

  const validationSchema = Yup.object({});

  const { handleSubmit, setFieldValue, values, resetForm } = useFormik({
    initialValues: {
      ruc: "15216477891",
      razonSocial: "HOTEL HARRISON",
      lateCheckOut: null,
      estado: "PENDIENTE",
      reserva: {
        id: null,
      },
      caja: {
        id: 1,
      },
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
      createFactura(data).then((resp) => {
        console.log("RESP", resp);
        changeBookStatus("FINALIZADO", values.reserva.id).then(console.log);
        message.success("Hospedaje finalizado.")
      });
      listRooms();
      resetForm();
      setDrawerVisible(false);
    },
  });

  const listRooms = () => {
    getBooks().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
        data.nombreHuesped = data.huesped.nombre;
        data.documentoHuesped = data.huesped.documento;
        data.nombreHabitacion = data.habitacion.nombre;
        data.rangoFecha =
          moment(data.fechaInicio).format("dddd, D MMMM [del] YYYY") +
          " - " +
          moment(data.fechaFinal).format("dddd, D MMMM [del] YYYY");
      });
      const filterStatus = resp.filter((data) => data.estado === "ACTIVO");
      setDataSource(filterStatus);
      console.log(resp);
      console.log("FILTER", filterStatus);
      setLoading(false);
    });
  };

  const openDrawer = (id) => {
    getBookById(id).then((resp) => {
      resp.nombreHabitacion = resp.habitacion.nombre;
      resp.nombreTipoHabitacion = resp.habitacion.tipoHabitacion.nombre;
      resp.nombreHuesped = resp.huesped.nombre;
      resp.documentoHuesped = resp.huesped.documento;
      setBook(resp);
    });
    setFieldValue("reserva.id", id);
    setDrawerVisible(true);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "left",
      align: "center",
    },
    {
      title: "Huésped",
      dataIndex: "nombreHuesped",
      key: "nombreHuesped",
      align: "center",
      width: 250,
    },
    {
      title: "Documento",
      dataIndex: "documentoHuesped",
      key: "documentoHuesped",
      align: "center",
      width: 150,
    },
    {
      title: "Habitación",
      dataIndex: "nombreHabitacion",
      key: "nombreHabitacion",
      align: "center",
      width: 150,
    },
    {
      title: "Fecha",
      dataIndex: "rangoFecha",
      key: "rangoFecha",
      align: "center",
      width: 250,
    },
    {
      title: "Precio Total",
      dataIndex: "precioTotal",
      key: "precioTotal",
      align: "center",
      width: 150,
      render: (val, record) => <span>S/{record.precioTotal}.00</span>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      render: (val, record) => {
        switch (record.estado) {
          case "PENDIENTE":
            return <Tag color="volcano">{record.estado}</Tag>;
          case "ACTIVO":
            return <Tag color="green">{record.estado}</Tag>;
          case "FINALIZADO":
            return <Tag color="blue">{record.estado}</Tag>;
          default:
            <Tag color="gold">NO DEFINIDO</Tag>;
            break;
        }
      },
      filters: [
        {
          text: "PENDIENTE",
          value: "PENDIENTE",
        },
        {
          text: "ACTIVO",
          value: "ACTIVO",
        },
        {
          text: "FINALIZADO",
          value: "FINALIZADO",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        let estado = String(record.estado);
        return estado.indexOf(value) === 0;
      },
      width: 150,
    },
    {
      title: "Acciones",
      key: "action",
      fixed: "right",
      width: 150,
      align: "center",
      render: (values, record) => (
        <>
          <Button type="link" size="small">
            <EyeOutlined />
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => openDrawer(record.id)}
          >
            Finalizar
          </Button>
        </>
      ),
    },
  ];

  const keyUpTable = (value) => {
    setFilterTable(
      dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  useEffect(() => {
    listRooms();
  }, []);

  return (
    <div>
      <Drawer
        visible={drawerVisible}
        title="Finalizar Reserva"
        width={550}
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
      >
        <Alert
          type="info"
          banner
          showIcon={false}
          style={{ paddingBottom: "2px", marginBottom: "20px" }}
          description={
            <Descriptions layout="vertical">
              <Descriptions.Item label="Fecha Inicio">
                {book.fechaInicio}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha Final">
                {book.fechaFinal}
              </Descriptions.Item>
              <Descriptions.Item label=""></Descriptions.Item>
              <Descriptions.Item label="Habitación">
                {book.nombreHabitacion + " (" + book.nombreTipoHabitacion + ")"}
              </Descriptions.Item>
              <Descriptions.Item label="Huesped">
                {book.nombreHuesped + " (" + book.documentoHuesped + ")"}
              </Descriptions.Item>
              <Descriptions.Item label="Estacionamiento/Placa">
                {book.placaVehiculo === null
                  ? "NO REGISTRADO"
                  : book.placaVehiculo}
              </Descriptions.Item>
              <Descriptions.Item label="Precio Total">
                {book.precioTotal}
              </Descriptions.Item>
              <Descriptions.Item label="Pago Adelantado">
                {book.pagoAdelantado}
              </Descriptions.Item>
              <Descriptions.Item label="Pago Restante">
                {book.precioTotal - book.pagoAdelantado}
              </Descriptions.Item>
            </Descriptions>
          }
        />
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item label="Pago Restante">
            <Input
              type="number"
              name="pagoRestante"
              min={book.precioTotal - book.pagoAdelantado}
              max={book.precioTotal - book.pagoAdelantado}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Finalizar Reserva
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <PageHeader
        className="site-page-header"
        title="Check-Out"
        subTitle="Proceso de Check-Out, finalizar hospedaje."
      />
      <Input.Search
        className="searchInput"
        placeholder="Buscar por Huesped, documento, habitación..."
        onKeyUpCapture={(e) => keyUpTable(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Table
        loading={loading}
        dataSource={filterTable === null ? dataSource : filterTable}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default CheckOut;
