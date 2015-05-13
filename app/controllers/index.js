// Referencia Global a widget loader
// - http://titaniumcontrols.com/details.php?id=63
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

// Si la imagen es capturada con éxito
var callbackExito = function(imagen) {
	Alloy.createController('editar', {
		imagen : imagen
	}).getView().open();
};

// Si hay un error capturando la imagen para el meme
var callbackError = function(_error) {
	if (_error.code == Titanium.Media.NO_CAMERA) {
		alert('Dispositivo sin camara.');
	} else {
		alert('Error indeterminado.');
	}
};

// Callback para el botón de tomar foto
function callbackTomarFoto(_evento) {
	require('capturarFoto').capturar(callbackExito, callbackError);
}

// Muestra la informción que queramos sobre la App en un dialog
// - http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.AlertDialog
function mostrarInformacion(_evento) {
	
	var dialogo= Ti.UI.createAlertDialog({
		message : L('acerca_de'),
		buttonNames : [L('boton_cerrar')],
		title : L('titulo_acerca')
	});	
	
	dialogo.show();
}

// Abrimos la vista principal
$.index.open(); 