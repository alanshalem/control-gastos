import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
	gastos,
	setGastos,
	presupuesto,
	setPresupuesto,
	setIsValidPresupuesto,
}) => {
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);
	const [porcentaje, setPorcentaje] = useState(0);

	useEffect(() => {
		// Reduce acumula una gran cantidad de datos en una sola variable
		const totalGastado = gastos.reduce(
			(total, gasto) => gasto.cantidad + total,
			0
		);
		const totalDisponible = presupuesto - totalGastado;

		// Calcular el porcentaje gastado
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		console.log(nuevoPorcentaje);

		setGastado(totalGastado);
		setDisponible(totalDisponible);

		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);
		}, 500);
	}, [gastos]);

	const formatearPresupuesto = (presupuesto) => {
		return presupuesto.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	const handleResetApp = () => {
		const resultado = confirm("¿Desear reiniciar presupuesto y gastos?");
		if (resultado) {
			setGastos([]);
			setPresupuesto(0);
			setIsValidPresupuesto(false);
		}
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<CircularProgressbar
					styles={buildStyles({
						pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
						trailColor: "#F5F5F5",
						textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
					})}
					value={porcentaje}
					text={`${porcentaje}% Gastado`}
				/>
			</div>
			<div className='contenido-presupuesto'>
				<button
					className='reset-app'
					type='button'
					onClick={handleResetApp}
				>
					Resetear la app
				</button>
				<p>
					<span>Presupuesto: </span>{" "}
					{`${formatearPresupuesto(presupuesto)}`}
				</p>

				<p className={`${disponible < 0 && "negativo"}`}>
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
