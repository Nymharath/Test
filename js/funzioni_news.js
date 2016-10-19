function caricaNews(){
    if (localStorage.getItem('usrData') != null) {

            var url = endpoint + 'news';
            var token = JSON.parse(localStorage.getItem('usrData')).token;
            var data = {
                token : token
            };

            $.ajax({
                url : url,
                method : 'GET',
                data : 'data=' + JSON.stringify(data),

                success : function(response) {

                    $.LoadingOverlay("show", {
                        image       : "",
                        fontawesome : "fa fa-spinner fa-spin"
                    });

                    
                    if (response.data.length == 0) {
                        console.log('Non ci sono contatti');
                        $('#tabella_contatti').hide();
                        $('#tabella_vuota').text('Non ci sono contatti');
                    } else {
                        $('#tb_contatti').html('');
                            var tableBody = '';
                            for (i = 0; i < response.data.length; i++){
                            var obj = response.data[i];

                            var lines = $('#dettaglio_testo').val().split('\n');
    
                            tableBody +=
                                '<tr>' + 
                                    '<td>' + obj.titolo + '</td>' +
                                    '<td>' + obj.sottotitolo + '</td>' +
                                    '<td>' + lines[0] + '</td>' +
                                    '<td>' + '<a href="javascript:;" class="edit" data-id="' + obj.id + 
                                        '" title="Modifica ' + obj.titolo + ' ' + obj.sottotitolo + 
                                        '"><i class="glyphicon glyphicon-pencil" /></a>' + '</td>' +
                                    '<td>' + '<a href="javascript:;" class="delete" data-id="' + obj.id + 
                                        '" title="Cancella ' + obj.titolo +' '+ obj.sottotitolo +
                                        '"><i class="glyphicon glyphicon-trash" /></a>' + '</td>' +
                                '</tr>';
                        }
                        $('#tb_contatti').html(tableBody);
                        $('#tabella_contatti').show();
                        $('#tabella_vuota').hide();
                    }   /*END ELSE*/

                    $.LoadingOverlay('hide');
                    $.LoadingOverlay('hide');

                }, /*END SUCCESS*/

                error : function(response) {

                }

            });
 
        }
    }



        function vediDettaglio(id){
            for (i = 0; i< response.data.length;i++) {
                if (response.data[i].id == id) {
                    $("#dettaglio_id").val(id);
                    $("#dettaglio_titolo").val(response.data[i].titolo);
                    $("#dettaglio_sottotitolo").val(response.data[i].sottotitolo);
                    $("#dettaglio_testo").val(response.data[i].testo);
                }
            }
            $('#myModal').modal();
        }


        function salvaNews(){

            


            var id = $("#dettaglio_id").val();
            var titolo = $("#dettaglio_titolo").val();
            var sottotitolo = $("#dettaglio_sottotitolo").val();
            var testo = $("#dettaglio_testo").val();
            

            var news = {};
                news.titolo = titolo;
                news.sottotitolo = sottotitolo;
                news.testo = testo;

            // NUOVO CONTATTO


            if (id == 0){
                
                var url = endpoint + 'news/create';
                var data = {
                    token : JSON.parse(localStorage.getItem('usrData')).token,
                    news : JSON.stringify(news)
                }; 

                $.ajax({
                    url : url,
                    method : 'POST', 
                    data : 'data=' + JSON.stringify(data),

                    success : function(response) {
                        resetScheda();
                        caricaNews();
                    },

                    error : function(response) {
                        
                    }
                });

                
            } /*END IF*/

            //MODIFICA CONTATTO ESISTENTE
            else{
                news.id = id;
                var url = endpoint + 'news/save';
                var data = {
                    token : JSON.parse(localStorage.getItem('usrData')).token,
                    news : JSON.stringify(news)
                }; 

                $.ajax({
                    url : url,
                    method : 'POST', 
                    data : 'data=' + JSON.stringify(data),

                    success : function(response) {
                        resetScheda();
                        chiudiScheda();
                        caricaNews();
                    },

                    error : function(response) {
                        
                    }
                });
                    
                
            } /*END ELSE*/
            
        }


        function aggiungiNews(){
            resetScheda();
                        
        }

        function cancellaNews(id){
            if (confirm("Sicuro?")) {
                
                $.LoadingOverlay("show", {
                    image       : "",
                    fontawesome : "fa fa-spinner fa-spin"
                });

                var url = endpoint + 'news/delete';
                var data = {
                    token : JSON.parse(localStorage.getItem('usrData')).token,
                    news_id : id
                }; 

                $.ajax({
                    url : url,
                    method : 'POST', 
                    data : 'data=' + JSON.stringify(data),

                    success : function(response) {
                        
                        caricaNews();

                    },

                    error : function(response) {
                        
                    }
                });
            } /*END IF*/
        }


        function resetScheda(){
        	$("#dettaglio_id").val('0');
            $("#dettaglio_titolo").val('');
            $("#dettaglio_sottotitolo").val('');
            $("#dettaglio_testo").val('');
        }

        function chiudiScheda(){
        	$('#myModal').modal('hide');
        }