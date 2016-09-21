$(document).ready(function () {
	$.getJSON('/dictionary-api', displayTerms);
	$('form').submit(function (e) {
		e.preventDefault();
		$.post('/dictionary-api', {term: $('#term').val(), def: $('#def').val()}, displayTerms);
		this.reset();
	});
});

function displayTerms(terms) {
	$('d1').empty();
	$.each(terms, function () {
		$('<dt>').text(this.term).appendTo('d1');
		$('<dd>').text(this.def).appendTo('d1');
	});
	$('dt').dblclick(function() {
		$.ajax({
			url: '/dictionary-api/' + $(this).text(),
			type: 'DELETE',
			success: displayTerms
		});
	});
};