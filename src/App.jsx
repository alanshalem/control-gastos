import { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId } from './helpers';
import ListadoGastos from './components/ListadoGastos';

function App() {
	const [presupuesto, setPresupuesto] = useState(0);
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	const [modal, setModal] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);

	const [gastos, setGastos] = useState([]);

	const handleNuevoGasto = (e) => {
		e.preventDefault();
		console.log('Nuevo gasto');
		setModal(true);

		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	};

	const guardarGasto = (gasto) => {
		gasto.id = generarId();
		setGastos([...gastos, gasto]);
	
		setAnimarModal(false);

		setTimeout(() => {
			setModal(false);
		}, 500);

	};

	return (
		<div>
			<Header
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>

			{isValidPresupuesto && (
				<>
					<main className="contenido-principal">
						<ListadoGastos gastos={gastos} />
					</main>
					<div className="nuevo-gasto">
						<img
							src={IconoNuevoGasto}
							alt="Nuevo Gasto"
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
				/>
			)}
		</div>
	);
}

export default App;
