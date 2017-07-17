$(function() {
	signUp();
});

function signUp() {
	$('#signUpForm').find('.signUpSubmit').on('click', function(event) {
		event.preventDefault();
		
		if (!validateForm()) {
			return;
		}
		
		$('#successMessage').addClass('hidden');
		$('#errorMessage').addClass('hidden');
		
		$.ajax({
			method: "POST",
			url: "http://codeit.pro/frontTestTask/user/registration",
			data: $('#signUpForm').serialize()
		})
		.done(function(msg) {
			showMessage(msg);
			
			if (msg.status == 'OK') {
				location.href = "companies.html";
			}
		});
	});
}

function showMessage(message){
	if (message.status == 'Form Error' || message.status == 'Error') {
		$('#errorMessage').find('.content').text(message.message);
		$('#errorMessage').removeClass('hidden');
	} else if (message.status == 'OK') {
		$('#successMessage').find('.content').text(message.message);
		$('#successMessage').removeClass('hidden');
	}
}

function validateForm() {
	var errorClass = 'has-error';
	var isValid = true;
	
	$('.formField').each(function() {
		var field = $(this);
		var input = field.find('input, select');
		
		if (input.val() == '') {
			field.addClass(errorClass);
			isValid = false;
		} else {
			field.removeClass(errorClass);
		}
	});
	
	$('.formCheckbox').each(function() {
		var field = $(this);
		var input = field.find('input');
		
		if (!input.is(':checked')) {
			field.addClass(errorClass);
			isValid = false;
		} else {
			field.removeClass(errorClass);
		}
	});
	
	return isValid;
}