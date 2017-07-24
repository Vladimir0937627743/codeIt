$(function() {
	signUp();
	loadCompanies();
	loadNews();
});

function loadNews() {
	$.ajax({
			method: "GET",
			url: "http://codeit.pro/frontTestTask/news/getList"
		})
		.done(function(data) {
			$('.news').removeClass('loading');
			for (var i = 0; i < data.list.length; i++) {
				$('.newsList').append('<div class="item clear"><div class="clear"><img src="' + data.list[i].img + '" /><a class="header" href="' + data.list[i].link + '">' + data.list[i].description.substring(0,10) + '</a><div class="text">' + (data.list[i].description.length > 100 ? data.list[i].description.substring(0,100) + '...' : data.list[i].description) + '</div></div><div><strong><em>Author: </em></strong>' + data.list[i].author + '</div><div><strong><em>Public: </em></strong>' + data.list[i].date + '</div></div>')
				$('.pager').append('<li></li>')
			}
			$('.item').eq(0).addClass('active');
			$('.pager li').eq(0).addClass('active');
			
			$('.pager li').on('click', function() {
				var index = $('.pager li').index($(this));
				$('.item').removeClass('active');
				$('.pager li').removeClass('active');
				$(this).addClass('active');
				$('.item').eq(index).addClass('active');
			});
		});
	
}

function loadCompanies() {
	$.ajax({
			method: "GET",
			url: "http://codeit.pro/frontTestTask/company/getList"
		})
		.done(function(data) {
			$('.totalCompanies').removeClass('loading');
			$('.totalNumber').text(data.list.length);
			$('.listCompanies').removeClass('loading');
			for (var i = 0; i < data.list.length; i++) {
				$('.list').append('<li><a href="#">' + data.list[i].name + '</a></li>')
			}
		});
}

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
		.done(function(data) {
			showMessage(data);
			
			if (data.status == 'OK') {
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
	var isValid = true;
	
	$('.formField').each(function() {
		var field = $(this);
		var input = field.find('input, select');
		
		if (input.val() == '') {
			field.addClass('has-error');
			isValid = false;
		} else {
			field.removeClass('has-error');
		}
	});
	
	$('.formCheckbox').each(function() {
		var field = $(this);
		var input = field.find('input');
		
		if (!input.is(':checked')) {
			field.addClass('has-error');
			isValid = false;
		} else {
			field.removeClass('has-error');
		}
	});
	
	return isValid;
}