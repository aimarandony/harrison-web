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
  Modal,
  Descriptions,
} from "antd";
import { ClearOutlined, EyeOutlined } from "@ant-design/icons";

import { getRooms, getRoomById } from "../../services/RoomService";

import * as Yup from "yup";
import { useFormik } from "formik";
import { findBooksByRangeDate } from "../../services/BookService";
import { getRoomKinds } from "../../services/RoomKindService";

import "./Book.css";

const { RangePicker } = DatePicker;

const styleFormItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const Book = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [roomKinds, setRoomKinds] = useState([]);
  const [room, setRoom] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadFilter, setLoadFilter] = useState(false);

  const validationSchema = Yup.object().shape({
    dateRange: Yup.array()
      .nullable()
      .required("Fecha de Inicio y Fin requerido."),
  });

  const formik = useFormik({
    initialValues: {
      start: "",
      finish: "",
      dateRange: null,
      roomKind: "",
      numBeds: null,
    },
    validationSchema,
    onSubmit: (value) => {
      setLoadFilter(true);
      console.log("FORMIK", value);
      findBooksByRangeDate(value).then((data) => {
        if (formik.values.roomKind === "") {
          setFilterTable(formatDataRooms(data));
        } else {
          filterRooms(data);
        }
        setLoadFilter(false);
        console.log("RESP FORMIK", data);
      });
    },
  });

  const formatDataRooms = (data) => {
    data.forEach((data, idx) => {
      data.key = idx + 1;
      data.nivel = data.nivel.nombre;
      data.nroCamas = data.tipoHabitacion.nroCamas;
      data.precio = data.tipoHabitacion.precio;
      data.tipo = data.tipoHabitacion.nombre;
    });
    return data;
  };

  const listRooms = () => {
    getRooms().then((resp) => {
      setDataSource(formatDataRooms(resp));
      console.log(dataSource);
      setLoading(false);
    });
  };

  const getRoomInfo = (state, id) => {
    if (state) {
      getRoomById(id).then((resp) => {
        resp.nombreNivel = resp.nivel.nombre;
        resp.nombreTipo = resp.tipoHabitacion.nombre;
        resp.nroCamas = resp.tipoHabitacion.nroCamas;
        resp.precio = resp.tipoHabitacion.precio;
        setRoom(resp);
        setModalVisible(state);
      });
    } else {
      setModalVisible(state);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
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
      render: (val, record) => (
        <>
          <Button
            type="link"
            size="small"
            onClick={() => getRoomInfo(true, record.id)}
          >
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
    formik.setFieldValue("start", dateString[0]);
    formik.setFieldValue("finish", dateString[1]);
    formik.setFieldValue("dateRange", date);
  }

  const filterRooms = (data) => {
    let dataKindFilter = data.filter(
      (data) => data.tipoHabitacion.nombre === formik.values.roomKind
    );
    console.log("FILTER", dataKindFilter);
    setFilterTable(formatDataRooms(dataKindFilter));
  };

  const clearFilter = () => {
    setFilterTable(null);
    formik.resetForm();
  };

  useEffect(() => {
    getRoomKinds().then(setRoomKinds);
    listRooms(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Modal
        title={`Habitación ${room.nombre}`}
        visible={isModalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="room-photo">
          <img src={room.imagen} alt="Habitación" />
        </div>
        <p>{room.descripcion}</p>
        <Descriptions layout="vertical">
          <Descriptions.Item label="Nivel">
            {room.nombreNivel}
          </Descriptions.Item>
          <Descriptions.Item label="Tipo Habitación">
            {room.nombreTipo}
          </Descriptions.Item>
          <Descriptions.Item label="Nro Camas">
            {room.nroCamas}
          </Descriptions.Item>
          <Descriptions.Item label="Precio">
            S/ {room.precio}.00
          </Descriptions.Item>
        </Descriptions>
      </Modal>
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
            {formik.errors.dateRange && formik.touched.dateRange ? (
              <div className="error-field">{formik.errors.dateRange}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Tipo de Habitación" style={styleFormItem}>
            <Select
              showSearch
              name="roomKind"
              placeholder="Seleccione un distrito"
              optionFilterProp="children"
              style={{ width: "200px" }}
              value={formik.values.roomKind}
              onChange={(text) => formik.setFieldValue("roomKind", text)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {roomKinds.map((data) => (
                <Select.Option key={data.id} value={data.nombre}>
                  {data.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item label="N° de Camas" style={styleFormItem}>
            <InputNumber
              name="numBeds"
              min={0}
              max={5}
              value={formik.values.numBeds}
              onChange={(value) => formik.setFieldValue("numBeds", value)}
            />
          </Form.Item> */}
          <Form.Item
            label=""
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Button type="primary" htmlType="submit" loading={loadFilter}>
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
              <Button type="ghost" onClick={clearFilter}>
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
