import { useEffect, useState } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
	const [presupuesto, setPresupuesto] = useState(
		localStorage.getItem("presupuesto") ?? 0
	);
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	const [modal, setModal] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);

	const [filtro, setFiltro] = useState("");
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	const [gastos, setGastos] = useState(
		localStorage.getItem("gastos")
			? JSON.parse(localStorage.getItem("gastos"))
			: []
	);

	const [gastoEditar, setGastoEditar] = useState({});

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);
			setTimeout(() => {
				setAnimarModal(true);
			}, 500);
		}
	}, [gastoEditar]);

	useEffect(() => {
		Number(localStorage.setItem("presupuesto", presupuesto));
	}, [presupuesto]);

	useEffect(() => {
		Number(localStorage.setItem("gastos", JSON.stringify(gastos)));
	}, [gastos]);

	useEffect(() => {
		if (filtro) {
			const gastosFiltrados = gastos.filter(
				(gasto) => gasto.categoria === filtro
			);
			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro]);

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
		if (presupuestoLS > 0) {
			setPresupuesto(presupuestoLS);
			setIsValidPresupuesto(true);
		}
	}, []);

	const handleNuevoGasto = (e) => {
		e.preventDefault();
		console.log("Nuevo gasto");
		setModal(true);
		setGastoEditar({});

		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	};

	const guardarGasto = (gasto) => {
		if (gasto.id) {
			// Actualizar
			const gastoEditado = gastos.map((gastoActual) => {
				if (gastoActual.id === gasto.id) {
					return gasto;
				}
				return gastoActual;
			});
			setGastos(gastoEditado);
			setGastoEditar({});
		} else {
			// Nuevo Gasto
			gasto.id = generarId();
			gasto.fecha = Date.now();
			setGastos([...gastos, gasto]);
		}

		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	const eliminarGasto = (id) => {
		const gastoEliminado = gastos.filter((gasto) => gasto.id !== id);
		setGastos(gastoEliminado);
	};

	return (
		<div className={modal ? "fijar" : ""}>
			<Header
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>

			{isValidPresupuesto && (
				<>
					<main className='contenido-principal'>
						<Filtros filtro={filtro} setFiltro={setFiltro} />
						<ListadoGastos
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>
					<div className='nuevo-gasto'>
						<img
							src={IconoNuevoGasto}
							alt='Nuevo Gasto'
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
