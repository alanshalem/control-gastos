import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	guardarGasto,
	gastoEditar,
	setGastoEditar,
}) => {
	const [mensaje, setMensaje] = useState("");
	const [nombre, setNombre] = useState("");
	const [cantidad, setCantidad] = useState("");
	const [categoria, setCategoria] = useState("");
	const [fecha, setFecha] = useState("");
	const [id, setId] = useState("");

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setNombre(gastoEditar.nombre);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
			setId(gastoEditar.id);
			setFecha(gastoEditar.fecha);
		}
	}, [gastoEditar]);

	const ocultarModal = () => {
		setGastoEditar({});
		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if ([nombre, cantidad, categoria].includes("")) {
			setMensaje("Todos los campos son obligatorios");
			setTimeout(() => {
				setMensaje("");
			}, 3000);
			return;
		}

		guardarGasto({ nombre, cantidad, categoria, id, fecha });
		console.log("Formulario enviado");
	};

	return (
		<div className='modal'>
			<div className='cerrar-modal'>
				<img
					src={CerrarBtn}
					alt='Cerrar Modal'
					onClick={ocultarModal}
				/>
			</div>
			<form
				className={`formulario ${animarModal ? "animar" : "cerrar"}`}
				onSubmit={handleSubmit}
			>
				<legend>
					{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}
				</legend>

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
				<div className='campo'>
					<label id='nombre' htmlFor='nombre'>
						Nombre Gasto
					</label>
					<input
						type='text'
						id='nombre'
						name='nombre'
						placeholder='Añade el Nombre del Gasto'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className='campo'>
					<label id='cantidad' htmlFor='nombre'>
						Cantidad
					</label>
					<input
						type='number'
						id='cantidad'
						name='cantidad'
						placeholder='Añade la Cantidad del Gasto: ej. 300'
						value={cantidad}
						onChange={(e) => setCantidad(Number(e.target.value))}
					/>
				</div>

				<div className='campo'>
					<label id='categoria' htmlFor='nombre'>
						Categoria
					</label>
					<select
						id='categoria'
						value={categoria}
						onChange={(e) => setCategoria(e.target.value)}
					>
						<option value=''>-----SELECCIONE-----</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='casa'>Casa</option>
						<option value='gastos'>Gastos Varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>
				<input
					type='submit'
					value={
						gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"
					}
				/>
			</form>
		</div>
	);
};

export default Modal;
