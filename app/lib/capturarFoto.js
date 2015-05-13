// Trabajo con la camara de fotos del dispositivo
// - http://docs.appcelerator.com/titanium/latest/#!/guide/Camera_and_Photo_Gallery_APIs
function capturar(callbackExito, callbackError) {

	// Contenedor de la imagen a capturar
	var imagenCapturada = null;

	// - http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Media-method-showCamera
	Titanium.Media.showCamera({

		// Exito
		success : function(event) {
			if (OS_ANDROID) {

				// En Android es necesario redimensionar y rotar la imagen por un bug descrito en
				// TIMOB-3887 : https://jira.appcelerator.org/browse/TIMOB-3887
				// El primer argumento es el ancho, el segundo es la calidad
				// - https://github.com/ricardoalcocer/AndroidRotateImage
				imagenCapturada = require('imgfix').rotateAndResize(event.media, 640, 80);

			} else {
				imagenCapturada = event.media;
			}

			// Lanzamos el callback que hemos recibido del controlador
			// con la imagen capturada
			callbackExito(imagenCapturada);
		},

		error : function(error) {
			// Lanzamos el callback de error
			callbackError(error);
		},

		// Sólo queremos fotos, no vídeo
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]

	});
}

exports.capturar = capturar; 