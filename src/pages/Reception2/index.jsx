import React from "react";

import { PageHeader } from "antd";

import "./Reception2.css";
import RoomCardList from "../../components/RoomCardList";
import RoomFilterForm2 from "../../components/RoomFilterForm2";

function Reception2() {
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Recepción"
        subTitle="Recepción de habitaciones."
      />
      <RoomFilterForm2 />
      <RoomCardList />
    </div>
  );
}

export default Reception2;
