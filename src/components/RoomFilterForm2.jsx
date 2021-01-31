import { ClearOutlined } from "@ant-design/icons";
import { Button, Card, Form, Select, Tooltip } from "antd";
import React from "react";

const styleFormItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

function RoomFilterForm2() {
  return (
    <Card>
      <Form layout="inline">
        <Form.Item label="Tipo de Habitación" style={styleFormItem}>
          <Select
            showSearch
            allowClear
            name="roomKind"
            placeholder="Seleccione una opción"
            optionFilterProp="children"
            style={{ width: "200px" }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          ></Select>
        </Form.Item>
        <Form.Item label="Nivel" style={styleFormItem}>
          <Select
            showSearch
            allowClear
            name="roomKind"
            placeholder="Seleccione una opción"
            optionFilterProp="children"
            style={{ width: "200px" }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          ></Select>
        </Form.Item>
        <Form.Item label="Estado" style={styleFormItem}>
          <Select
            showSearch
            allowClear
            name="roomKind"
            placeholder="Seleccione una opción"
            optionFilterProp="children"
            style={{ width: "200px" }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          ></Select>
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
  );
}

export default RoomFilterForm2;
