import React, { useEffect, useState } from "react";

import RoomCard from "./RoomCard";

import { Card, Row } from "antd";
import { getRooms } from "../services/RoomService";
import BookRegisterForm from "./BookRegisterForm";

import moment from "moment";
import "moment/locale/es";

function RoomCardList() {
  moment.locale("es");

  const [rooms, setRooms] = useState([]);
  const [bookFormStatus, setBookFormStatus] = useState(false);
  const [registeredBook, setRegisteredBook] = useState(false);
  const [changeStatusRoom, setChangeStatusRoom] = useState(false);

  const listRooms = () => {
    getRooms().then((resp) => {
      resp.forEach((data) => {
        data.tipo = data.tipoHabitacion.nombre;
        data.nombreNivel = data.nivel.nombre;
        data.nroCamas = data.tipoHabitacion.nroCamas;
        data.precio = data.tipoHabitacion.precio;
      });
      setRooms(resp);
      console.log("LIST CARDLIST");
    });
  };

  const handleCardRoom = (status, id, precio) => {
    switch (status) {
      case "DISPONIBLE":
        localStorage.setItem(
          "preDataBook",
          JSON.stringify({
            start: moment().format("YYYY-MM-DD"),
            finish: moment().add(1, "days").format("YYYY-MM-DD"),
            roomId: id,
            roomPrice: precio,
          })
        );
        setBookFormStatus(true);
        break;
      case "OCUPADO":
        alert("Datos de la reserva.")
        break;
      case "MANTENIMIENTO":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    listRooms();
    if (registeredBook) {
      setRegisteredBook(false);
      console.log("LIST CARDLIST IFFF");
    }
    if (changeStatusRoom) {
      setChangeStatusRoom(false);
    }
  }, [registeredBook, changeStatusRoom]);

  return (
    <>
      <Card title={<span>Habitaciones</span>} style={{ marginTop: "20px" }}>
        <Row gutter={[10, 10]}>
          {rooms.map((data) => (
            <RoomCard
              key={data.id}
              roomData={data}
              onClick={() => handleCardRoom(data.estado, data.id, data.precio)}
              onSetChangeStatusRoom={setChangeStatusRoom}
            />
          ))}
        </Row>
      </Card>
      <BookRegisterForm
        status={bookFormStatus}
        onSetStatus={setBookFormStatus}
        onSetRegisteredBook={setRegisteredBook}
      />
    </>
  );
}

export default RoomCardList;
