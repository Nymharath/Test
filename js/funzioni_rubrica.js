function caricaContatti(){

            var url = endpoint + 'contatti';
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

                    persone = response.data;
                    if (persone.length == 0) {
                        console.log('Non ci sono contatti');
                        $('#tabella_contatti').hide();
                        $('#tabella_vuota').text('Non ci sono contatti');
                    } else {
                        $('#tb_contatti').html('');
                            var tableBody = '';
                            for (i = 0; i < persone.length; i++){
                            var obj = persone[i];

                            tableBody +=
                                '<tr class="sfondoTabella_' + obj.sesso + '">' + 
                                    '<td>' + obj.cognome + '</td>' +
                                    '<td>' + obj.nome + '</td>' +
                                    '<td>' + obj.telefono + '</td>' +
                                    '<td>' + '<a href="javascript:;" class="edit" data-id="' + obj.id + 
                                        '" title="Modifica ' + obj.nome + ' ' + obj.cognome + 
                                        '"><i class="glyphicon glyphicon-pencil" /></a>' + '</td>' +
                                    '<td>' + '<a href="javascript:;" class="delete" data-id="' + obj.id + 
                                        '" title="Cancella ' + obj.nome +' '+ obj.cognome +
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



        function vediDettaglio(id){
            for (i = 0; i< persone.length;i++) {
                if (persone[i].id == id) {
                    $("#dettaglio_id").val(id);
                    $("#dettaglio_nome").val(persone[i].nome);
                    $("#dettaglio_cognome").val(persone[i].cognome);
                    $("#dettaglio_telefono").val(persone[i].telefono);
                    $("input[name='sesso'][value='" + persone[i].sesso +"']").prop("checked", true);
                    $("#dettaglio_note").val(persone[i].note);
                }
            }
            $('#myModal').modal();
        }


        function salvaContatto(){

            


            var id = $("#dettaglio_id").val();
            var nome = $("#dettaglio_nome").val();
            var cognome = $("#dettaglio_cognome").val();
            var telefono = $("#dettaglio_telefono").val();
            var sesso = $("input[name='sesso']:checked").val();
            var note = $("#dettaglio_note").val();
            

            var persona = {};
                persona.nome = nome;
                persona.cognome = cognome;
                persona.telefono = telefono;
                persona.sesso = sesso;
                persona.note = note;

            // NUOVO CONTATTO


            if (id == 0){
                
                var url = endpoint + 'contatti/create';
                var data = {
                    token : JSON.parse(localStorage.getItem('usrData')).token,
                    persona : JSON.stringify(persona)
                }; 

                $.ajax({
                    url : url,
                    method : 'POST', 
                    data : 'data=' + JSON.stringify(data),

                    success : function(response) {
                        resetScheda();
                        caricaContatti();
                    },

                    error : function(response) {
                        
                    }
                });

                
            } /*END IF*/

            //MODIFICA CONTATTO ESISTENTE
            else{
                persona.id = id;
                var url = endpoint + 'contatti/save';
                var data = {
                    token : JSON.parse(localStorage.getItem('usrData')).token,
                    persona : JSON.stringify(persona)
                }; 

                $.ajax({
                    url : url,
                    method : 'POST', 
                    data : 'data=' + JSON.stringify(data),

                    success : function(response) {
                        resetScheda();
                        chiudiScheda();
                        caricaContatti();
                    },

                    error : function(response) {
                        
                    }
                });
                    
                
            } /*END ELSE*/
            
        }


        function aggiungiContatto(){
            resetScheda();
                        
        }

        function cancellaContatto(id){
            if (confirm("Sicuro?")) {
                
                $.LoadingOverlay("show", {
                    image       : "",
                    fontawesome : "fa fa-spinner fa-spin"
                });

                var url = endpoint + 'contatti/delete';
                var data = {
                    token : JSON.parse(localStorage.getItem('usrData')).token,
                    persona_id : id
                }; 

                $.ajax({
                    url : url,
                    method : 'POST', 
                    data : 'data=' + JSON.stringify(data),

                    success : function(response) {
                        
                        caricaContatti();

                    },

                    error : function(response) {
                        
                    }
                });
            } /*END IF*/
        }


        function resetScheda(){
        	$("#dettaglio_id").val('0');
            $("#dettaglio_nome").val('');
            $("#dettaglio_cognome").val('');
            $("#dettaglio_telefono").val('');
            $("#dettaglio_sesso").prop('checked', false);
            $("#dettaglio_note").val('');
        }

        function chiudiScheda(){
        	$('#myModal').modal('hide');
        }