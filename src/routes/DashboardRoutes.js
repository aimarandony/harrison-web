import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import Book from "../pages/Book";
import Client from "../pages/Client";
import Product from "../pages/Product";
import Reception from "../pages/Reception";
import Room from "../pages/Room";

export const DashboardRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/reserva" component={Book} />
        <Route exact path="/recepcion" component={Reception} />
        <Route exact path="/productos" component={Product} />
        <Route exact path="/mantenimiento/habitacion" component={Room} />
        <Route exact path="/clientes" component={Client} />
        <Redirect to="/reserva" />
      </Switch>
    </Layout>
  );
};
