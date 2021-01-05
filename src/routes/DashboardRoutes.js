import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import Book from "../pages/Book";
import Reception from "../pages/Reception";

export const DashboardRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/reserva" component={Book} />
        <Route exact path="/recepcion" component={Reception} />
        <Redirect to="/reserva" />
      </Switch>
    </Layout>
  );
};
