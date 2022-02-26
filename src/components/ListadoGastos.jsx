import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({ gastos }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>
        {gastos.length
          ? gastos.map((gasto) => <Gasto key={gasto.id} gasto={gasto} />)
          : "No hay gastos aun"}
      </h2>
      {}
    </div>
  );
};

export default ListadoGastos;
