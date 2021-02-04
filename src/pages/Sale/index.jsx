import { EyeOutlined } from "@ant-design/icons";
import { Button, Input, PageHeader, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getBooks } from "../../services/BookService";

import moment from "moment";
import "moment/locale/es";
import SaleRoomForm from "../../components/SaleRoomForm";

const Sale = () => {
  moment.locale("es");

  const [loading, setLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [bookId, setBookId] = useState(null);

  const listRooms = () => {
    getBooks().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
        data.nombreHuesped =
          data.huesped.nombre.toUpperCase() +
          " " +
          data.huesped.apellido.toUpperCase();
        data.documentoHuesped = data.huesped.documento;
        data.nombreHabitacion =
          data.habitacion.nombre + " " + data.habitacion.tipoHabitacion.nombre;
      });
      const filterStatus = resp.filter((data) => data.estado === "ACTIVO");
      setDataSource(filterStatus);
      setLoading(false);
      console.log("LIST SALE");
    });
  };

  const openFormSale = (id) => {
    setDrawerVisible(true);
    setBookId(id);
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
      width: 120,
    },
    {
      title: "Habitación",
      dataIndex: "nombreHabitacion",
      key: "nombreHabitacion",
      align: "center",
      width: 150,
    },
    {
      title: "Acciones",
      key: "action",
      fixed: "right",
      width: 120,
      align: "center",
      render: (values, record) => (
        <>
          <Button type="link" size="small">
            <EyeOutlined />
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => openFormSale(record.id)}
          >
            Vender
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
        title="Venta"
        subTitle="Venta de productos a las habitaciones."
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
      <SaleRoomForm
        status={drawerVisible}
        setStatus={setDrawerVisible}
        bookId={bookId}
      />
    </div>
  );
};

export default Sale;
