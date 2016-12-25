
jQuery(document).ready(function($){






	$("#prix_range").ionRangeSlider({
		type: "double",
		grid: true,
		min: 0,
		max: 20000,
		from: 1000,
		step: 1000,
		prefix: "DZ"
	});

	$('select').material_select();

	var selParent=$('select.categories').parent();
	selParent.find('input').css("font-size","13px");
	selParent=$('select.tailles').parent();
	selParent.find('input').css("font-size","13px");



	



});




