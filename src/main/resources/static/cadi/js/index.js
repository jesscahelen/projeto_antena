$(document).ready(function() {
    var login = document.getElementById('login');
    var cadastro = document.getElementById('cadastro');
    
    window.onclick = function(event) {
        if (event.target == login) {
            login.style.display = "none";
        }

        if (event.target == cadastro) {
            cadastro.style.display = "none";
        }
    }

    $('#cpf-cadastro').mask('000.000.000-00', {reverse: true});

});

$("#btn-cadastro").click(function(event) {

    event.preventDefault();

//    nome = $("#nome-cadastro").val();
//    email = $("#email-cadastro").val();
//    cpf = $("#cpf-cadastro").val();
//    senha = $("#senha-cadastro").val();

    json = {
           nome: $("#nome-cadastro").val(),
           email: $("#email-cadastro").val(),
           senha: $("#senha-cadastro").val()
       }

    jsonString = JSON.stringify(json);

    $.post("/cadicadastro",jsonString,'json');
})

$('form').submit(function(e){    
				
    e.preventDefault();
    
    var userName = $('#email-login').val().trim();
    var password = $('#senha-login').val().trim();
    
    $.post("/cadi", JSON.stringify({'email': userName, 'senha': password}), function(data){
            
        // if(data[0] == null){
        //     //window.location.href = '/loginadm.html';
        //     alert("Não foi");
        // } else {
        //     alert("foi");
        //     //sessionStorage.setItem("userNameADM",data[0].userName);
        //    // window.location.href = '/index.html';
        // }
        alert(data);
        console.log(data);
            
    }, "json");
    
});

function abrePopupLogin(event) {
    event.preventDefault();
    document.getElementById('login').style.display='block';    
}

function fechaPopupLogin(event) {
    event.preventDefault();
    document.getElementById('login').style.display='none';    
}

function abrePopupCadastro(event) {
    event.preventDefault();
    document.getElementById('cadastro').style.display='block';    
}

function fechaPopupCadastro(event) {
    event.preventDefault();
    document.getElementById('cadastro').style.display='none';    
}