import React from 'react';

const ListadoGastos = ({ gastos }) => {
	return (
		<div>
			<p>{gastos.length ? 'gastos' : 'no hay gastos aun'}</p>
		</div>
	);
};

export default ListadoGastos;
