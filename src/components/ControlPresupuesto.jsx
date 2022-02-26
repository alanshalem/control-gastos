import { useState, useEffect } from "react";

const ControlPresupuesto = ({ gastos, presupuesto }) => {
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	useEffect(() => {
		// Reduce acumula una gran cantidad de datos en una sola variable
		const totalGastado = gastos.reduce((acumulador, gasto) => {});
	}, [gastos]);

	const formatearPresupuesto = (presupuesto) => {
		return presupuesto.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<p>Grafica Aqui</p>
			</div>
			<div className='contenido-presupuesto'>
				<p>
					<span>Presupuesto: </span>{" "}
					{`${formatearPresupuesto(presupuesto)}`}
				</p>

				<p>
					<span>Disponible: </span>{" "}
					{`${formatearPresupuesto(disponible)}`}
				</p>

				<p>
					<span>Gastado: </span> {`${formatearPresupuesto(gastado)}`}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;
