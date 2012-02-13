/*
GMZ Cart @gbr
TODO: Shift enter conclui a venda!
*/
$(document).ready(function() {

	add = ".addToCart";
	rmv = ".removeFromCart";
	var cartList = [];


	/* 
		SEARCH BAR UX 
		Melhoras na search bar para melhor UX - 'Power quickAdd experience'
	*/

	$(".dataTables_filter label input").focus(); // Dá searchbar focus on load, better UX

	$(document).bind('keyup', 'f', function(event){
    	$(".dataTables_filter label input").focus().select();
    });

    $(".dataTables_filter label input").keyup(function() {
    	var reg = new RegExp("^[0-9]$"); // only nums!
    	cod = $(this).val();

    	$(this).bind('keyup', 'shift+return', function(event){
    			//alert("venda concluida");
  		});

    	if( reg.test(cod) ) {	// Se for o cod de um produto ele já adiciona no cart
    		$(this).bind('keyup', 'return', function(event){
    			$("table.cart .pid-"+ cod ).find(add).click();
    			quickAdd = true;
  			});
    	}
    });

    $(".qtdNum").click(function() {
    	$(this).select();
    })

	$(window).keydown(function(event){ // block enter form submit
	    if(event.keyCode == 13) { // & quickAdd - Para bloquear somente qndo power quickAdd for utilizado
	      event.preventDefault();
	      return false;
	    }
  	});

  	$(document).bind('keyup', 'shift+return', function(event){
    			alert("Venda concluida");
  	});

  	// Add to cart stuff
	$("#content").on('click', add, function(event) {

		$(".realcart").fadeIn("slow");

		event.preventDefault();

		id = $(this).closest("td").attr("class").split("-"); // Retira só a id do pid-id
		id = id[1];
		qtd = $(".qtd-"+ id +" input").val();
		
		getData(id);
		if(!$(this).hasClass("approve")) {
			addItem(id,nome,valor,qtd);	
		}
		qtdField(id);


		// Animações e UX improvements
		$(this).removeClass(add).addClass("approve active").css({"opacity":".6","cursor":"default"}).text("Já adicionado").animate({width: "87px"});
		$(this).next().addClass("pid-"+id).show().animate({width: "10px"}); // show Remove button
		$(".qtd-"+ id ).css("display","inline");
		$(".qtd-"+ id +" input").show().focus().select();
	});

	// Remove btn stuff
	$("#content").on('click', rmv, function(event) {
		event.preventDefault();
		id = $(this).attr("alt");
		$(".realcart").find("tr#"+ id ).hide();
		$("table.cart .pid-"+id).find(rmv).hide();
		$(".pid-"+ id ).find(add).removeClass("approve active").addClass(add).css({"opacity":"1","cursor":"auto"}).text("Adicionar ao carrinho").css({width:"121px"});
		$(".qtd-"+ id +" input").val("").fadeOut("fast");
		rmvItem(id);
	});

	function rmvItem(id) {
		$.each( cartList, function(i, v) {
			if(cartList[i]['id'].trim() == id) {
					cartList.splice(i, 1);
			}
		});
		 
 		if(cartList == '') {
		 	$(".realcart").hide();
		}
	}

	// Just for debugging
	$('h3').click(function() {
		//alert(cartList);
		console.log(cartList);
	});
	

	function addItem(id,nome,valor,qtd) {
		$(".realcart").find("tr#"+ id ).show();
		new Notification('<strong>'+nome+':</strong> adicionada ao carrinho', 'success');
		
		cartList.push({
        'id':id,
        'valor':valor,
        'quantidade':qtd,
        'nome':nome
  		});
	}
	function qtdField(id) {

		$(".qtd-"+ id +" input").keyup(function(e){
  			var val = $(this).val();
  			if (val == '0') {
  				$(this).val(1); val = 1;
  			}
  			
  			$(".qtdField-"+ id ).val(val);
  			atualizaValor(id,val);

  			$(this).bind('keyup', 'return', function(event){
				$(".dataTables_filter label input").focus().val(""); // Envia de volta pra busca
  			});
  		});

  		$(".qtdField-"+ id ).keyup(function(e){
  			var val = $(this).val();
  			if (val == '0') {
  				$(this).val(1); val = 1;
  			}	

  			$(".qtd-"+ id +" input").val(val);
  			atualizaValor(id,val);
  		});
  		
  		function atualizaValor(id,val) {
  			valor_u = valor;
  			valor_u = valor_u.replace(",",".").split(" ");
  			valor_u = valor_u[1];
  			val_qtdtotal = val.replace(",",".");
  			valor_novo = (val_qtdtotal*valor_u);
  			
  			// formata o novo_valor no padrão brasileiro
  			$(".realcart").find("tr#"+ id +" .valor").html(valor_novo).formatCurrency({region: 'pt-BR' });

			$.each( cartList, function(i, v) {
			    if( v.id == id ) {
			       cartList[i]['quantidade'] = val;
			    }
			 });

			// console.log(cartList);
  		}

		$(".qtd-"+ id +" input").numeric();
		$(".qtdField-"+ id ).numeric();

  	}

	$(".qtd input").focusout(function() {
		if($(this).val() == "") {
			$(this).val("1").keyup();	
		}
	});

	function getData(id) {
		arr = $(".pid-"+ id ).find(add).attr("alt").split("|");
		nome = arr[2];
		valor = arr[1];
		descricao = arr[3];
	}

});