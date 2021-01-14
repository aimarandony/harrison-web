import { EyeOutlined } from "@ant-design/icons";
import { Button, Input, PageHeader, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getBooks } from "../../services/BookService";

import moment from "moment";
import "moment/locale/es";

const CheckOut = () => {
  moment.locale("es");

  const [loading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const [dataSource, setDataSource] = useState([]);

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
      const filterStatus = resp.filter((data) => data.estado === "REALIZADO");
      setDataSource(filterStatus);
      console.log(resp);
      console.log("FILTER", filterStatus);
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
          case "REALIZADO":
            return <Tag color="blue">{record.estado}</Tag>;
          case "COMPLETADO":
            return <Tag color="green">{record.estado}</Tag>;
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
          text: "REALIZADO",
          value: "REALIZADO",
        },
        {
          text: "COMPLETADO",
          value: "COMPLETADO",
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
          <Button type="primary" size="small">
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
