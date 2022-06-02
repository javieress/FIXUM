const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');

const QR = new QRCode(contenedorQR);

console.log('poto');

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	QR.makeCode(formulario.link.value);
});
