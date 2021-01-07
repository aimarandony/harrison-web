import React, { useEffect, useState } from "react";

import {
  Form,
  Button,
  PageHeader,
  Table,
  Tag,
  DatePicker,
  Select,
  Card,
  Tooltip,
} from "antd";
import { ClearOutlined, EyeOutlined } from "@ant-design/icons";

import { getRooms } from "../../services/RoomService";

import * as Yup from "yup";
import { useFormik } from "formik";
import { findBooksByRangeDate } from "../../services/BookService";

const { RangePicker } = DatePicker;
const { Option } = Select;

const styleFormItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const Book = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [filterTable, setFilterTable] = useState(null);

  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      start: "",
      finish: "",
      dateRange: null,
    },
    validationSchema,
    onSubmit: (value) => {
      console.log("FORMIK", value);
      findBooksByRangeDate(value).then((data) => {        
        console.log(data);
      });
    },
  });

  const listRooms = () => {
    getRooms().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
        data.nivel = data.nivel.nombre;
        data.nroCamas = data.tipoHabitacion.nroCamas;
        data.precio = data.tipoHabitacion.precio;
        data.tipo = data.tipoHabitacion.nombre;
      });
      setDataSource(resp);
      console.log(resp);
      setLoading(false);
    });
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
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      width: 150,
    },
    {
      title: "Tipo de Habitación",
      dataIndex: "tipo",
      key: "tipo",
      align: "center",
      width: 250,
    },
    {
      title: "Nivel",
      dataIndex: "nivel",
      key: "nivel",
      align: "center",
      width: 150,
      filters: [
        {
          text: "PRIMER PISO",
          value: "PRIMER PISO",
        },
        {
          text: "SEGUNDO PISO",
          value: "SEGUNDO PISO",
        },
        {
          text: "TERCER PISO",
          value: "TERCER PISO",
        },
        {
          text: "CUARTO PISO",
          value: "CUARTO PISO",
        },
        {
          text: "QUINTO PISO",
          value: "QUINTO PISO",
        },
        {
          text: "SEXTO PISO",
          value: "SEXTO PISO",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        let nivel = String(record.nivel);
        return nivel.indexOf(value) === 0;
      },
    },
    {
      title: "N° Camas",
      dataIndex: "nroCamas",
      key: "nroCamas",
      align: "center",
      width: 100,
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      align: "center",
      width: 150,
      render: (val, record) => <span>S/{record.precio}.00</span>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      render: (val, record) => {
        switch (record.estado) {
          case "DISPONIBLE":
            return <Tag color="green">{record.estado}</Tag>;
          case "OCUPADO":
            return <Tag color="volcano">{record.estado}</Tag>;
          case "MANTENIMIENTO":
            return <Tag color="blue">{record.estado}</Tag>;
          default:
            <Tag color="gold">NO DEFINIDO</Tag>;
            break;
        }
      },
      filters: [
        {
          text: "DISPONIBLE",
          value: "DISPONIBLE",
        },
        {
          text: "OCUPADO",
          value: "OCUPADO",
        },
        {
          text: "MANTENIMIENTO",
          value: "MANTENIMIENTO",
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
      render: (record) => (
        <>
          <Button type="link" size="small">
            <EyeOutlined />
          </Button>
          <Button type="primary" size="small" style={{ marginLeft: "8px" }}>
            Reservar
          </Button>
        </>
      ),
    },
  ];

  const dateFormatList = ["DD-MM-YYYY", "YYYY-MM-DD"];

  function onChangeRange(date, dateString) {
    console.log(date, dateString);
    formik.setFieldValue("start", dateString[0]);
    formik.setFieldValue("finish", dateString[1]);
    formik.setFieldValue("dateRange", date);
  }

  useEffect(() => {
    listRooms();
    setFilterTable(null)
  }, []);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Reserva"
        subTitle="Reserva de Habitaciones."
      />
      <Card>
        <Form layout="inline" onSubmitCapture={formik.handleSubmit}>
          <Form.Item label="Fecha Inicio Y Fin" required style={styleFormItem}>
            <RangePicker
              name="dateRange"
              value={formik.values.dateRange}
              onChange={onChangeRange}
              format={dateFormatList[1]}
            />
          </Form.Item>
          <Form.Item label="Tipo de Habitación" style={styleFormItem}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Selecciona un tipo"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item label="N° de Camas" style={styleFormItem}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select un número"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label=""
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Button type="primary" htmlType="submit">
              Buscar Habitación
            </Button>
          </Form.Item>
          <Form.Item
            label=""
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Tooltip title="Limpiar Datos">
              <Button type="ghost">
                <ClearOutlined />
              </Button>
            </Tooltip>
          </Form.Item>
        </Form>
      </Card>
      <Table
        loading={loading}
        dataSource={filterTable === null ? dataSource : filterTable}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1000 }}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Book;
