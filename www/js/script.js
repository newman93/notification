$( document ).ready(function() {
	let dateObj = new Date();
	
	let date1 = new Date();
	let year = dateObj.getFullYear();
	let month = dateObj.getMonth();
	let day = dateObj.getDate();
	
	if (month <= 8) {
		month = month + 1;	
		month = "0" + month;
 	}
	
	if (day <= 8) {
		day = "0" + day + 1;		
	}
	
	let date = year  + "-" + month + "-" + day ;
	
	checkProgress();
	$("[id*='"+date+"']").addClass('highlight');
	
	
	$(document).on('click', '.calendar-month-navigation', function() {
		checkProgress();
	});
	
    $(document).on('click', '.calendar-dow td div', function () {
		$("div").removeClass("highlight");
		$('.list-group').remove();
		$(this).addClass('highlight');
		let list = '<ul class="list-group">'; 
		
		if (window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-dualingo") != null) {
			list += '<li class="list-group-item list-group-item-success" id="dualingo">Dualingo</li>';
		} else {
			list += '<li class="list-group-item list-group-item-danger" id="dualingo">Dualingo</li>';
		}
		
		if (window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-trening") != null) {
			list += '<li class="list-group-item list-group-item-success" id="trening">Trening</li>';
		} else {
			list += '<li class="list-group-item list-group-item-danger" id="trening">Trening</li>';
		}

		if (window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-nauka") != null) {
			list += '<li class="list-group-item list-group-item-success" id="nauka">Nauka</li>';
		} else {
			list += '<li class="list-group-item list-group-item-danger" id="nauka">Nauka</li>';
		}

		if (window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-pismo") != null) {
			list += '<li class="list-group-item list-group-item-success" id="pismo">Pismo</li>';
		} else {
			list += '<li class="list-group-item list-group-item-danger" id="pismo">Pismo</li>';
		}
		
		list += '</ul>';
		$(".row").append(list);
		$('.list-group').attr('id', $(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]);
	});
	
	$(document).on('click', '.list-group-item', function() {
		if ($(this).hasClass('list-group-item-danger')) {
			$(this).removeClass('list-group-item-danger');
			$(this).addClass('list-group-item-success');
			window.localStorage.setItem($(this).parent().attr('id')+"-"+$(this).attr('id'), $(this).attr('id'));
		} else {
			$(this).addClass('list-group-item-danger');
			$(this).removeClass('list-group-item-success');
			window.localStorage.removeItem($(this).parent().attr('id')+"-"+$(this).attr('id'), $(this).attr('id'));
		}
		checkProgress();
	});
	
	function checkProgress() {
		$('.day').each(function() {
			console.log($(this).attr('id').match((/(\d{4})-(\d{2})-(\d{2})/)));
			let match = $(this).attr('id').match((/(\d{4})-(\d{2})-(\d{2})/));
			if (($(this).html() > day && match[1] == year && match[2] == month)|| match[1] != year || match[2] > month ) {
			} else if (window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-dualingo") != null
				&& window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-trening") != null
				&& window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-nauka") != null
				&& window.localStorage.getItem($(this).attr('id').match(/(\d{4})-(\d{2})-(\d{2})/)[0]+"-pismo") != null
				) {
				$(this).removeClass('fail');
				$(this).addClass('success');
			} else {
				$(this).removeClass('success');
				$(this).addClass('fail');
			}
	});
	}
});