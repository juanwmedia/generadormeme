var args = arguments[0] || {};

// Referencia global a la ventana
var $estaVentana = $.editar;

// Muestro la imagen capturada de fondo
$.laFoto.image = args.imagen;

// Editamos el texto superior
function editarTextoArriba(_evento) {
	require('dialogoEditar').mostrarDialogo({
		hint : L('introduce_texto'),
		closeButton : L('boton_cerrar'),
		callback : function(text) {
			$.textoArriba.text = text;
		}
	});
}

// Editamos el texto inferior
function editarTextoAbajo(_evento) {
	require('dialogoEditar').mostrarDialogo({
		hint : L('introduce_texto'),
		closeButton : L('boton_cerrar'),
		callback : function(text) {
			$.textoAbajo.text = text;
		}
	});
}

function cerrarVentana() {
	$estaVentana.close();
}

// Compartimos el meme generado
function compartirMeme(_evento) {
	
	var meme = archivoCompartir = null;
	
	// Mostramos el widget o el componente nativo para Android
	if (OS_ANDROID) {
		$.progressIndicator.show();
	} else {
		Alloy.Globals.loading.show(L('generando'), false);
	}

	// toImage es una operacion sincrona, por lo que debemos dejar un poco de tiempo
	// a la UI para aparecer antes de lanzar la conversión
	setTimeout(function() {
		if (OS_ANDROID) {
			meme = $.meme.toImage().media;
			archivoCompartir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'tmpmeme.jpg');
		} else {
			meme = $.meme.toImage();
			archivoCompartir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'tmpmeme.jpg');
		}
		archivoCompartir.write(meme);

		// Mostramos el diálogo para compartir
		// - https://github.com/ricardoalcocer/socialshare
		require('com.alcoapps.socialshare').share({
			status : L('firma'),
			image : archivoCompartir.nativePath,
			androidDialogTitle : L('android_share_dialog')
		});

		// Ocultamos la barra/indicador de progreso
		if (OS_ANDROID) {
			$.progressIndicator.hide();
		} else {
			Alloy.Globals.loading.hide();
		}
		
	}, 200);
}