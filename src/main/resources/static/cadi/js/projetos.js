$(document).ready(function () {
    /**/
    var session_login = sessionStorage.getItem("sess_email_cadi");
    if(session_login == null){
    
            window.location.href = 'index.html';

     }
    var url = "/semdono"

    $.getJSON(url, function (data) {
        
        var projetos = [];
        $.each(data, function (i) {
            console.log(i);
            var id = this._id;
            projetos.push("<tr> <td>" + this.name + "</td><td>" + this.fase + "</td><td>" + this['responsavel-cadi'] + "</td><td class='text-center'  onClick='"+getProjeto(id)+"'>" + "Atribuir <img id='"+id+"' src='imgs/enter.svg' alt='' width='20px' style='cursor:pointer' id='atribuir' >" + "</td></tr>");
        });
        $("#tabela-projetos").append(projetos); 
    });
    
    });
    /* Tem que atualizar o Dom da tabela */
   function getProjeto(id){
        $("#tabela-projetos").empty();
        $.post("/semdono", JSON.stringify({'id_projeto': id, 'email': sessionStorage.getItem("sess_email_cadi")}), "json");

   
   }
   