import React, { useState } from "react";

import { Layout, Menu, Breadcrumb, Dropdown, Button } from "antd";
import {
  FileOutlined,
  UserOutlined,
  CalendarOutlined,
  BellOutlined,
  SelectOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  ToolOutlined,
  KeyOutlined,
  DownOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";

import "./Layout.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutCustom = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<CalendarOutlined />}>
            <NavLink to="/reserva" activeClassName="active">
              Reserva
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<BellOutlined />}>
            <NavLink to="/recepcion" activeClassName="active">
              Recepción
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<SelectOutlined />}>
            Check Out
          </Menu.Item>
          <SubMenu key="sub1" icon={<ShoppingCartOutlined />} title="Venta">
            <Menu.Item key="4">Productos</Menu.Item>
            <Menu.Item key="5">Vender</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<InboxOutlined />} title="Caja">
            <Menu.Item key="6">Apertura</Menu.Item>
            <Menu.Item key="7">Cierre</Menu.Item>
            <Menu.Item key="8">Resumen</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<ToolOutlined />} title="Mantenimiento">
            <Menu.Item key="6">Habitación</Menu.Item>
            <Menu.Item key="7">Categoría</Menu.Item>
            <Menu.Item key="8">Nivel</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<UserOutlined />}>
            Clientes
          </Menu.Item>
          <SubMenu key="sub4" icon={<FileOutlined />} title="Reporte">
            <Menu.Item key="10">Diario</Menu.Item>
            <Menu.Item key="11">Mensual</Menu.Item>
            <Menu.Item key="12">Caja</Menu.Item>
            <Menu.Item key="13">Recepcionista</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<KeyOutlined />} title="Administración">
            <Menu.Item key="14">Usuarios</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Dropdown overlay={menu}>
            <Button type="dashed" size="large">
              <UserOutlined />
              Aimar Andony
              <DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Reserva</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;
