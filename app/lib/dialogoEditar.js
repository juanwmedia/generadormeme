// Implementación crossplatform en módulo de Alert Dialogo en Android/IOS
// - http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.AlertDialog
function mostrarDialogo(argumentos) {
	
	if (OS_IOS) {
		var dialog = Ti.UI.createAlertDialog({
			title : argumentos.hint,
			style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames : [argumentos.closeButton, 'OK'],
			cancel : 0
		});
		
		dialog.addEventListener('click', function(_evento) {
			if (_evento.index !== _evento.source.cancel) {
				argumentos.callback(_evento.text);
			}
		});
		
		dialog.show();
		
	} else {
		// En Android debemos crear un textfield y asignarlo al dialog
		var textfield = Ti.UI.createTextField({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL
		});
		// ///////////////////////
		
		var dialog = Ti.UI.createAlertDialog({
			title : argumentos.hint,
			androidView : textfield, // Aquí lo asignamos
			buttonNames : ['OK', argumentos.closeButton],
			cancel : 1
		});
		
		dialog.addEventListener('click', function(_evento) {
			if (_evento.index !== _evento.source.cancel) {
				argumentos.callback(_evento.source.androidView.value); // Enviamos el valor (value) del textField
			}
		});
		
		dialog.show();
	}
}

exports.mostrarDialogo = mostrarDialogo;