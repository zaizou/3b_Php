var product=new Object();
var products=new Array();
product.prix=15000;
product.cardRef="mix1";
products.push(product);
var product=new Object();
product.prix=6000;
product.cardRef="mix2";
products.push(product);
var product=new Object();
product.prix=4000;
product.cardRef="mix3";
products.push(product);
var product=new Object();
product.prix=30000;
product.cardRef="mix4";
products.push(product);
var product=new Object();
product.prix=5000;
product.cardRef="mix5";
products.push(product);
var product=new Object();
product.prix=30000;
product.cardRef="mix6";
products.push(product);

var product=new Object();
product.prix=6000;
product.cardRef="mix8";
products.push(product);


var product=new Object();
product.prix=3000;
product.cardRef="mix9";
products.push(product);

var product=new Object();
product.prix=3500;
product.cardRef="mix10";
products.push(product);

var product=new Object();
product.prix=7000;
product.cardRef="mix11";
products.push(product);

var product=new Object();
product.prix=8500;
product.cardRef="mix12";
products.push(product);


var product=new Object();
product.prix=21000;
product.cardRef="mix13";
products.push(product);


var product=new Object();
product.prix=21500;
product.cardRef="mix14";
products.push(product);


jQuery(document).ready(function($){

	//open/close lateral filter
	$('.cd-filter-trigger').on('click', function(){
		triggerFilter(true);
	});
	$('.cd-filter .cd-close').on('click', function(){
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	$('.cd-tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.cd-tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();
			
			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			//alert(event.target.tagName);
			if(event.target.tagName=="<img>")
				$( event.target ).parent().addClass('selected');
			$(event.target).addClass('selected');
		}
	});


	$('.tab-img').on('click', function(event){
		
			
			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			//alert(event.target.tagName);
			$(event.target).parent().addClass('selected');
		

	});
		
	



	
	//close filter dropdown inside lateral .cd-filter 
	$('.cd-filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = $('.cd-main-content').offset().top,
			scrollTop = $(window).scrollTop();
		( scrollTop >= offsetTop ) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
	}

	/************************************
		MitItUp filter settings
		More details:
		https://mixitup.kunkalabs.com/
		or:
		http://codepen.io/patrickkunka/
	*************************************/

	//buttonFilter.init();
	$('.cd-gallery ul').mixItUp({
	    controls: {
	    	enable: false
	    },
	    callbacks: {
	    	onMixStart: function(){
	    		$('.cd-fail-message').fadeOut(200);
	    	},
	      	onMixFail: function(){
	      		$('.cd-fail-message').fadeIn(200);
	    	}
	    }
	});



	//search filtering
	//credits http://codepen.io/edprats/pen/pzAdg
	var inputText;
	var $matching = $();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		};
	})();


});





	


/*****************************************************
	MixItUp
*****************************************************/
var selectedCategory="";
var selectedPointure="";
var selectedTaille="";
var selectedIntervalle=""
var selectedTailleStandard="";
var selectedFilter="";
var filterString="";
var habillements=false;
var $container=$('.cd-gallery ul');


jQuery(document).ready(function($){


	/*****************************************************
Prix Slider
 *****************************************************/

	var rangeSlider=document.getElementById('prix_range_slider');

	noUiSlider.create(rangeSlider, {
		range:{
			min:0,
			max:30000
		},
		behaviour: 'drag',
		start:[10000,16000],
		connect: true,
		step:1000,
		format: wNumb({
			decimals: 0,
			thousand: '',
			postfix: ' ',
		})

	});

	rangeSlider.noUiSlider.on('update', function( values, handle ) {
		//alert(rangeSlider.noUiSlider.get()[0]);
		$("#inf_prix_range").val(rangeSlider.noUiSlider.get()[0]);
		$("#inf_prix_range").text(rangeSlider.noUiSlider.get()[0]);
		$("#sup_prix_range").val(rangeSlider.noUiSlider.get()[1]);
		$("#sup_prix_range").text(rangeSlider.noUiSlider.get()[1]);
		//snapValues[handle].innerHTML = values[handle];
		var min=parseInt(rangeSlider.noUiSlider.get()[0]);
		var max=parseInt(rangeSlider.noUiSlider.get()[1]);
		if( $('#priceSwitche').prop('checked') ) 
			handlePrixChanged(min,max);
		
	});

	rangeSlider.setAttribute('disabled',true);
	$('#priceSwitche').on('change',function () {
		console.log($(this).prop('checked')	);
		if($(this).prop('checked')){
			rangeSlider.removeAttribute('disabled');
			if(rangeSlider){
				var min=parseInt(rangeSlider.noUiSlider.get()[0]);
				var max=parseInt(rangeSlider.noUiSlider.get()[1]);
				handlePrixChanged(min,max);
			}
		}
		else{
			handlePriceOff()
			rangeSlider.setAttribute('disabled', true );
		}


	});



	function handlePriceOff(){
		filterString=filterString.replace('.price','');
		applyFilter()
	}



	function handlePrixChanged(min,max){
		if($container.mixItUp('isLoaded')){

			if(selectedIntervalle!=""){
				console.log("previously selected cat is :  "+selectedIntervalle);
				filterString=filterString.replace(selectedIntervalle,'');
			}
			
			selectedIntervalle=".price";
			filterString+=selectedIntervalle;

			//console.log("Current filter String is :  "+filterString);
			updateCards(min,max);
			//console.log("min is :"+min+"  max is :"+max);
			applyFilter();
		}

	}

	function updateCards(min,max){
		for( i=0;i<products.length;i++){
			console.log("prix du produit :"+products[i].prix+" index is :"+i);
			if(products[i].prix>=min && products[i].prix <=max)
				$("#"+products[i].cardRef).addClass('price');
			else
				$("#"+products[i].cardRef).removeClass('price');
		}

	}

	$( "li.mix" ).each(function( index ) {
		//console.log( index + ": " + $( this ).text() );
	});

});

$("li.filter").on("click",function () {
	if($container.mixItUp('isLoaded')){
		if($(this).attr('id')!="all"){
			if( filterString.indexOf('price') !== -1 )
					filterString="."+$(this).attr('id')+".price";
			else	filterString="."+$(this).attr('id');

			selectedFilter="."+$(this).attr('id');
		}
				
		else{
			filterString=filterString.replace(selectedFilter,'');
			if( !(filterString.indexOf('price') !== -1) )
				filterString+=$(this).attr('id');
			selectedFilter="";
		}
		$container.mixItUp('filter',filterString);
		console.log(filterString);

		switch ( $(this).attr('id') ) {
			case "habim" : 	handleHabimChoose(); break;
			case "chauss":  handleChaussChoose(); break;
			default :handleDefaultChoose(); break
		}
	}
});



function handleHabimChoose(){
	$("#pointureBlock").css('display','none');
	$("#tailleBlock").css('display','');
	$("#tailleStandardBlock").css('display','');


}

function handleChaussChoose(){

	$("#pointureBlock").css('display','');
	$("#tailleBlock").css('display','none');
	$("#tailleStandardBlock").css('display','none');



}

function handleDefaultChoose(){
	$("#pointureBlock").css('display','');
	$("#tailleBlock").css('display','');
	$("#tailleStandardBlock").css('display','');

}


$("#categoryFilterSelect").on('change',function () {

		if($container.mixItUp('isLoaded')){
			if(selectedCategory!=""){
				console.log("previously selected cat is :  "+selectedCategory);
				filterString=filterString.replace(selectedCategory,'');
			}
			if($(this).val() !="all"){
				selectedCategory=$(this).val();
				filterString+=selectedCategory;
			}

			console.log("Current filter String is :  "+filterString);
			applyFilter();

		}

});


	$("#pointureFilterSelect").on('change',function () {

		if($container.mixItUp('isLoaded')){
			if(selectedPointure!=""){
				console.log("previously selected cat is :  "+selectedPointure);
				filterString=filterString.replace(selectedPointure,'');
			}
			if($(this).val() !="all") {
				selectedPointure="."+$(this).val();
				filterString+=selectedPointure;
			}

			console.log("Current filter String is :  "+filterString);
			applyFilter();

		}

	});



$("#tailleFilterSelect").on('change',function () {

	if($container.mixItUp('isLoaded')){
		if(selectedTaille!=""){
			console.log("previously selected cat is :  "+selectedTaille);
			filterString=filterString.replace(selectedTaille,'');
		}
		if($(this).val() !="all") {
			selectedTaille="."+$(this).val();
			filterString+=selectedTaille;
		}

		console.log("Current filter String is :  "+filterString);
		applyFilter();

	}

});


$("#tailleStandardFilterSelect").on('change',function () {

	if($container.mixItUp('isLoaded')){
		if(selectedTailleStandard!=""){
			console.log("previously selected cat is :  "+selectedTailleStandard);
			filterString=filterString.replace(selectedTailleStandard,'');
		}
		if($(this).val() !="all") {
			selectedTailleStandard="."+$(this).val();
			filterString+=selectedTailleStandard;
		}

		console.log("Current filter String is :  "+filterString);
		applyFilter();

	}

});


function applyFilter(){
		if(filterString=="")
			filterString="all";
		$container.mixItUp('filter',filterString);
		if( filterString.indexOf('price') !== -1 ){
			if( filterString.indexOf(selectedFilter) !== -1 )
				filterString=""+selectedFilter+".price";
			else
				filterString=""+".price";
		}else filterString="";



}

	function addArticleView(classString,imageLink,price,model,stock,detailLink){
		var elem="";
		elem += "            <li class=\"mix "+classString+" \">";
		elem += "                <div class=\"demo-card-image card  mdl-shadow--2dp\">";
		elem += "                    <div class=\"mdl-card__title mdl-card--expand\">titre de l'image<\/div>";
		elem += "                    <div class=\"mdl-card__media\">";
		elem += "                        <div class=\"hover01\">";
		elem += "                            <figure>";
		elem += "                                <img class=\"item-img\" src=\" "+imageLink+" \"\/>";
		elem += "                            <\/figure>";
		elem += "                        <\/div>";
		elem += "                    <\/div>";
		elem += "";
		elem += "                <\/div>";
		elem += "                <div class=\"mdl-card__actions product-title\" style=\"background: green\">";
		elem += "                    <span class=\"demo-card-image__filename\">"+model+"<\/span>";
		elem += "                <\/div>";
		elem += "                <div class=\"mdl-card__actions\">";
		elem += "                    <div class=\"row\">";
		elem += "                        <div class=\"chip\">";
		elem += "                            <a><i class=\"fa fa-money\"><\/i> "+price+" DA <\/a>";
		elem += "                        <\/div>";
		elem += "";
		elem += "                        <div class=\"chip\">";
		elem += "                            <a><i class=\"zmdi zmdi-store\"><\/i> "+stock+" Restants<\/a>";
		elem += "                        <\/div>";
		elem += "";
		elem += "                    <\/div>";
		elem += "                    <a href=\""+detailLink+"\" class=\"waves-effect waves-light btn center-block\"><i class=\"zmdi zmdi-eye \"><\/i> Consulter<\/a>";
		elem += "";
		elem += "                <\/div>";
		elem += "";
		elem += "                <\/div>";
		elem += "            <\/li>";
		elem += "";


		$container.mixItUp('append',elem,function (state) {
			alert(state.$show);
		});


	}


























