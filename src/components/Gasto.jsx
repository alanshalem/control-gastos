import React from "react";
import { formatearFecha } from "../helpers";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

// Diccionario Iconos
const diccionarioIconos = {
	ahorro: IconoAhorro,
	casa: IconoCasa,
	comida: IconoComida,
	gastos: IconoGastos,
	ocio: IconoOcio,
	salud: IconoSalud,
	suscripciones: IconoSuscripciones,
};

const Gasto = ({ gasto }) => {
	const { nombre, cantidad, categoria, fecha } = gasto;

	return (
		<div className='gasto sombra' key={gasto.id}>
			<div className='contenido-gasto'>
				<img src={diccionarioIconos[categoria]} alt={categoria} />
				<div className='descripcion-gasto'>
					<p className='categoria'>{categoria}</p>
					<p className='nombre-gasto'>{nombre}</p>
					<p className='fecha-gasto'>
						Agregado el: <span>{formatearFecha(fecha)}</span>
					</p>
				</div>
				<div className='cantidad-gasto'>${cantidad}</div>
			</div>
		</div>
	);
};

export default Gasto;
