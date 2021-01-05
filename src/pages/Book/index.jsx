import React, { useEffect, useState } from "react";

import { Button, Input, Table, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import { getRooms } from "../../services/RoomService";

const Book = () => {
  const [loading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const [dataSource, setDataSource] = useState([]);

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
      setLoading(false)
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
      width: 200,
      align: "center",
      render: (record) => (
        <>
          <Button type="link" size="small">
            <EyeOutlined />
          </Button>
          <Button type="link" size="small">
            <EditOutlined />
          </Button>
          <Button type="primary" size="small" style={{marginLeft: '8px'}}>
            Reservar
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
      <Input.Search
        className="searchInput"
        placeholder="Buscar por ..."
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

export default Book;
