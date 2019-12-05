/**/
var session_login = sessionStorage.getItem("sess_email_cadi");


if(session_login == null){
        window.location.href = 'index.html';
}else{

  $(document).ready(function () {
      

      let timeline = new Timeline('/dono');
      let projects;
      let maisInfoModal = $('#modal-mais-info');

/* Informações do Usuário CADI */
      $.post("/usuarioLogado", JSON.stringify({'email': session_login}), function(user){
        userData(user);
      }, "json");
 
    
/* </> Informações do Usuário CADI */


       /* <> Rotas de inicialização dos objetos */
      $.get('/dono', session_login)
          .done(function(projetos){
          projects = JSON.parse(projetos);
          insertProjectsOnTable(projects);
      });

      $.get('/semdono')
          .done(function(projetos){
          projects = JSON.parse(projetos);
          insertSemDono(projects);
      });
      
       /* </> Rotas de inicialização dos objetos */

      /* <> Funções */
      function insertProjectsOnTable(projecs) {
      
          let tbody = $('[data-projects-table-body]');
      
          projecs.forEach(project => {
            let tr = $.parseHTML(`
              <tr data-project-item="${ project._id }">
                <th scope="row">${ project.titulo }</th>
                <td data-timeline-show></td>
                <td>
                  <a href="#" data-maisinfo data-toggle="modal" data-target="#modal-mais-info">Mais informações</a>
                </td>
              </tr>
            `);

          
      
            let $tr = $(tr);
            let a = $tr.find('[data-maisinfo]');
            a.click(function(e) {
              
              e.preventDefault();
      
              maisInfoModal.find('#modal-label').text(project.titulo);
      
              let pegaElemento = id => $(maisInfoModal.find(`#${id}`));
      
              let elements = [
                {
                  element: pegaElemento('info-descricao-breve'),
                  key: 'descricao-breve'
                },          
                {
                  element: pegaElemento('info-descricao-completa'),
                  key: 'descricao-completa'
                },
                {
                  element: pegaElemento('info-descricao-tecnologias'),
                  key: 'descricao-tecnologias'
                },
                {
                  element: pegaElemento('info-links-externos'),
                  key: '',
                  excessao: true
                },
                {
                  element: pegaElemento('info-link-externo-1'),
                  key: 'link-externo-1'
                },
                {
                  element: pegaElemento('info-link-externo-2'),
                  key: 'link-externo-2'
                },
                {
                  element: pegaElemento('info-empresario'),
                  key: 'responsavel-empresario'
                },
                {
                  element: pegaElemento('info-professores-responsaveis'),
                  key: 'responsavel-professor',
                  excessao: true
                },
                {
                  element: pegaElemento('info-reuniao'),
                  key: 'reuniao',
                  excessao: true
                },
                {
                  element: pegaElemento('info-entregas'),
                  key: 'entregas',
                  excessao: true
                },
                {
                  element: pegaElemento('info-negado'),
                  key: 'status',
                  excessao: true
                }
              ];
      
              elements.forEach(item => {
      
                let contentElement = item.element.find('[data-text-content]');

                item.element.removeClass('d-none');
      
                if (item.key.indexOf('link-externo') != -1) {
                  contentElement.attr('href', project[item.key]);
                }
      
                if (item.key && !item.excessao) {
                  if (!project[item.key]) {
                    item.element.addClass('d-none');
                    return;
                  }
                  else {
                    contentElement.text(project[item.key]);
                  }
                }
                else if (!item.key) {
                  if (!project['link-externo-1'] && !project['link-externo-2']) {
                    item.element.addClass('d-none');
                    return;
                  }
                }
                else if (item.key === 'status') {
                  if (!project.status.negado) {
                    item.element.addClass('d-none');
                    return;
                  }
                  else {
                    contentElement.text(project.status.motivo);
                  }
                }
                else if (item.key === 'reuniao') {
                  let reuniao = project.reuniao;
                  
                  if (!reuniao.data && !reuniao.horario && !reuniao.local) {
                    item.element.addClass('d-none');
                    return;
                  }
                  else {
                    contentElement.text(`${reuniao.data} - ${reuniao.horario} - ${reuniao.local}`);
                  }
                }
                else if (item.key === 'entregas' || item.key ==='responsavel-professor') {
                  $('#info-entregas li').remove();
                  if (!project[item.key].length) {
                    item.element.addClass('d-none');
                    return;
                  }
                  else {
                      project[item.key].forEach(x => {
                        console.log(x);
                        contentElement.append($.parseHTML(`<li class="divider list-group-item-info">Aluno Responsável: </li>
                        <li>${x['aluno-responsavel']}</li>
                        <li class="divider list-group-item-info">Alunos</li>`));

                        x['alunos'].forEach(x => {
                            contentElement.append($.parseHTML(`<li>${x}</li>`));
                        });

                        contentElement.append($.parseHTML(`
                        <li class="divider list-group-item-info"></li>
                        <li>Link Respositório: <a href="${x['link-repositorio']}">${x['link-repositorio']}</a></li>
                            <li>Link Cloud: <a href="${x['link-cloud']}">${x['link-cloud']}</a></li>
                            <li>Comentário: ${x['comentario']}</li>
                        `));
                    });
                  }
                }
              });
              $('#modal-mais-info ul').addClass('list-group');
              $('#modal-mais-info li').addClass('list-group-item');
            });
         
            timeline.insertTimeline($tr.find('[data-timeline-show]').get(0), project);
      
            tbody.append(tr);
          });
      }


      function insertSemDono(projecs) {
      
        let tbody_semdono = $('[data-semdono-table-body]');
    
        projecs.forEach(project => {
          email = project['responsavel-empresario'];
          var empresa;
          var contato;
          var $tr2
          $.get('/searchEmpresario/'+email)
          .done( data => {
            //, function(data){
              console.log(data)
              empresa = JSON.parse(data).empresa;
              telefone = JSON.parse(data).telefone;
              console.log(empresa)
              var tr2 = $.parseHTML(`<tr data-project-item="${ project._id.$oid }> 
              <th scope="row">${ project.titulo }</th>
                  <td>${ project.titulo }</td>
                  <td>${ project['descricao-breve'] }</td>
                  <td>${ empresa }</td>
              </tr>`);
              $tr2 = $(tr2);
  
              tbody_semdono.append(tr2);

              $tr2.click(function(e) {
                e.preventDefault();
              
                let modbody = $('[modal-body-semdono]');
                let modfooter = $('[modal-footer-semdono]');
  
                let body_sd =  $.parseHTML(`
                <div><h5>Titulo</h5><p>${ project.titulo }</p></div>
                <div><h5>Descricao: </h5><p>${ project['descricao-breve'] }</p></div>
                <div><h5>Empresário: </h5><p>${ project['responsavel-empresario']}</p></div>
                <div><h5>Empresa: </h5><p>${ empresa }</p></div>
                <div><h5>Contato: </h5><p>${ telefone }</p></div>
                `);
  
                let foot_sd = $.parseHTML(`
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Atribuir a mim</button>
                `);
  
                let $submit = $(foot_sd);
                
              
                /* Abre modal */
                document.getElementById('modal_semdono').style.display='block';   
            
                /* Evento que fecha o modal e limpa os dados do append*/
                $('#fecharModal').click(function(){
                  document.getElementById('modal_semdono').style.display='none'; 
                  modbody.html("");
                  modfooter.html("");
                });
  
                /* evento que submita a atribuição para o CADI */
                $submit.click(function(){
                    $.post("/semdono", JSON.stringify({'_id':project._id, 'responsavel-cadi': sessionStorage.getItem("sess_email_cadi")}), "json");
                    location.reload();
                });
  
                modbody.append(body_sd);
                modfooter.append(foot_sd);
          });
            })
          .fail( e => console.log(e))
          
          })
          
          
          
      }

      function userData(user){
          /* <> Logou do Usuário */
          let navCADI = $('[data-user-nav]');
          let logout = $.parseHTML(`
          <li><i class="fa fa-sign-out" aria-hidden="true"></i> 
          <button type="button" class="btn btn-danger">Logout</button></li>`);

          let $logout = $(logout);
          $logout.click(function(e) {
              e.preventDefault();
              if (confirm('Realmente deseja Sair ?')) {
                  sessionStorage.clear(session_login);
                  window.location.href = 'index.html';
              }
          });


          /* Alterar Senha */
          let updateSenha = $.parseHTML(`
          <li><i class="fa fa-sign-out" aria-hidden="true"></i>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-update-senha">
              Alterar Senha
          </button>
          </li>`);

          let $updateSenha = $(updateSenha);
          $updateSenha.click(function(e){
            e.preventDefault();
            _formUpdateSenha(user);
          });
          /* </> Alterar Senha */

          /* </> Logou do Usuário */

          /* Pupula Usuário Data */
          let data = $.parseHTML(`
          <li>${user.nome}</li>
          <li>${user.nivel == 2 ? "Administrador" : "Usuario CADI"}</li>`);
          /* </> Pupula Usuário Data */
          if(user.nivel == 2) {
            $.post("/listarCadi", function(users){
              _isAdmin(users);
            }, "json");
            
          } 
        
          navCADI.append(data);
          navCADI.append(updateSenha);
          navCADI.append(logout);
         $("li").addClass("list-inline-item");
      }

  /* </> Funções */
 
      
  });

}
function fechaPopupSemDono(event) {
  event.preventDefault();
  document.getElementById('modal_semdono').style.display='none';    
}

function _formUpdateSenha(user){

  let form_senha =  `
    <div class="modal fade" id="modal-update-senha" tabindex="-1" role="dialog" aria-labelledby="modal-update-senha" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Alteração de Senha</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
       Senha: <input class="form-control"  type="password" id="senha-antiga" name="senha-antiga" placeholder="Senha Atual" style="max-width:350px" required>
       Nova Senha: </label><input class="form-control" type="password" id="senha-nova1" name="senha-nova1" placeholder="Nova Senha" style="max-width:350px" required>
       Nova Senha Novamente: </label><input class="form-control" type="password" id="senha-nova2" name="senha-nova2" placeholder="Nova Senha" style="max-width:350px" required>
        </div>
        <div class="modal-footer" >
          <button type="submit" class="btn btn-primary alterarSenha" id="alterarSenha">Salvar mudanças</button>
          <div id="modal-footer-password"></div>
          </div>
      </div>
    </div>
  </div>`;

  /* Evento insere modal no HTML */
  $(document.body).prepend(form_senha);
  /* Evento Remove modal do HTML */
  $('.close').click(function(e){
    e.preventDefault();
    $("#modal-update-senha").remove();
    $(".modal-backdrop ").remove();
  });
  /* Evento submita a senha nova */
  $('#alterarSenha').click(function(e){
    e.preventDefault();
    $("#modal-footer-password").html('');
    var senhaAntiga = $("#senha-antiga").val();
    var senha1 = $("#senha-nova1").val();
    var senha2 = $("#senha-nova2").val();
    
 
    if(senhaAntiga === user.senha && senhaAntiga != null){
        if(senha1 === senha2 && senha1 != null && senha2 != null){
          $.post("/updateCadi", JSON.stringify({'_id':user._id, 'senha': senha1}), "json");
          $('#modal-footer-password').append($.parseHTML(`<div class="alert alert-success" role="alert">
          Senha alterada com sucesso</div>`));
        }else{
          $('#modal-footer-password').append($.parseHTML(`<div class="alert alert-danger" role="alert">
          Senha de nova ou senha de confirmação inválidas ou não correspondentes.</div>`));
        }
    }else{
      $('#modal-footer-password').append($.parseHTML(`<div class="alert alert-danger" role="alert">
          Senha não corresponde com a atual!, por favor insira a senha correta.
      </div>`));
    }
  });
}

function _isAdmin(users){
    let ul_tabs = $('[tabs-nav-user]');
    let div_content = $('[tabs-content-user]');

    let nav =  $.parseHTML(`
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" href="#usuarios">Usuários</a>
    </li>`);

    let content = $.parseHTML(`<div id="usuarios" class="container tab-pane fade">
            <table class="table">
            <thead class="thead-dark">
                <tr>
                    <td scope="col">Nome</td>
                    <td scope="col">Email</td>
                    <td scope="col">Satus</td>
                    <td></td>
                </tr>
            </thead>
            <tbody data-user-admintab id="tabela-projetos">

            </tbody>
        </table>
    </div>`);

    ul_tabs.append(nav);
    div_content.append(content);
    
    users.forEach(user => {
      let tr = $.parseHTML(`<tr data-user-item="${ user._id }> 
        <th scope="row"></th>
            <td>${ user.nome }</td>
            <td>${ user.email }</td>
            <td>${ user.nivel < 1 ? 'Aguardando Aprovação' : user.nivel == 2 ? 'Administrador' : 'CADI' }</td>
            <td id="td-pass-${user._id.$oid}"></td>
            <td id="td-acess-${user._id.$oid}"></td>
        </tr>
    `);

    $('[data-user-admintab]').append(tr);

      /* Alterar Senha */
      let updateSenha = $.parseHTML(`
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-update-senha">
          Alterar Senha
      </button>
      </li>`);

      let $updateSenha = $(updateSenha);

      $updateSenha.click(function(e){
        e.preventDefault();
        _formAdminUpdateSenha(user);
      });

      $('#td-pass-'+user._id.$oid).append(updateSenha);

      /* Alterar Nivel De Acesso*/
      let updateAcesso = $.parseHTML(`
      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-update-acesso">
          Nível de Acesso
      </button>
      </li>`);

      let $updateAcesso = $(updateAcesso);
      
      $updateAcesso.click(function(e){
        e.preventDefault();
        _formUpdateAcess(user);
      });

      $('#td-acess-'+user._id.$oid).append(updateAcesso);

    });
}

function _formAdminUpdateSenha(user){

  let form_senha =  `
    <div class="modal fade" id="modal-update-senha" tabindex="-1" role="dialog" aria-labelledby="modal-update-senha" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Alteração de Senha</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
       Nova Senha: </label><input class="form-control" type="password" id="senha-nova1" name="senha-nova1" placeholder="Nova Senha" style="max-width:350px" required>
       Nova Senha Novamente: </label><input class="form-control" type="password" id="senha-nova2" name="senha-nova2" placeholder="Nova Senha" style="max-width:350px" required>
        </div>
        <div class="modal-footer" >
          <button type="submit" class="btn btn-primary alterarSenha" id="alterarSenha">Salvar mudanças</button>
          <div id="modal-footer-password"></div>
          </div>
      </div>
    </div>
  </div>`;

  /* Evento insere modal no HTML */
  $(document.body).prepend(form_senha);
  /* Evento Remove modal do HTML */
  $('.close').click(function(e){
    e.preventDefault();
    $("#modal-update-senha").remove();
    $(".modal-backdrop ").remove();
  });
  /* Evento submita a senha nova */
  $('#alterarSenha').click(function(e){
    e.preventDefault();
    $("#modal-footer-password").html('');
  
    var senha1 = $("#senha-nova1").val();
    var senha2 = $("#senha-nova2").val();
    
        if(senha1 === senha2 && senha1 != null && senha2 != null){
          $.post("/updateCadi", JSON.stringify({'_id':user._id, 'senha': senha1}), "json");
          $('#modal-footer-password').append($.parseHTML(`<div class="alert alert-success" role="alert">
          Senha alterada com sucesso</div>`));
        }else{
          $('#modal-footer-password').append($.parseHTML(`<div class="alert alert-danger" role="alert">
          Senha de nova ou senha de confirmação inválidas ou não correspondentes.</div>`));
        }

  });
}

function _formUpdateAcess(user){

  let form_acess =  `
  <div class="modal fade" id="modal-update-acesso" tabindex="-1" role="dialog" aria-labelledby="modal-update-acesso" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Atualização de acesso ao Usuário</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-check">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="optNivel" value="0">Pré cadastrado
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="optNivel" value="1">CADI
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="optNivel" value="2">Administrador
            </label>
          </div>
      </div>
      <div class="modal-footer" >
        <button type="submit" class="btn btn-primary" id="submit_updateAcesso">Salvar mudanças</button>
        <div id="modal-footer-password"></div>
        </div>
    </div>
  </div>
</div>`;

 /* Evento insere modal no HTML */
 $(document.body).prepend(form_acess);
 /* Evento Remove modal do HTML */
 $('.close').click(function(e){
    e.preventDefault();
    $("#modal-update-senha").remove();
    $(".modal-backdrop ").remove();
  });

  $('#submit_updateAcesso').click(function() {
    let nivel = $("input[name='optNivel']:checked").val();

    if (confirm('Deseja realmente alterar o nivel de acesso do '+user.nome)) {
      $.post("/updateCadi", JSON.stringify({'_id':user._id, 'nivel': nivel}), "json");
    }
   
  });
}