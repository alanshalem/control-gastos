export const generarId = () => {
	const random = Math.random().toString(36).substr(2);
	const fecha = new Date().now().toString(36);

	return random + fecha;
};
