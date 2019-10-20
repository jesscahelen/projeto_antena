$(document).ready(function () {
    /**/
    var session_login = sessionStorage.getItem("sess_email_cadi");
    
    if(session_login == null){
            window.location.href = 'index.html';
     }

    let timeline = new Timeline('/dono');
    let projects;
    let maisInfoModal = $('#modal-mais-info');

    
     $.get('/dono', session_login)
         .done(function(projetos){
         projects = JSON.parse(projetos);
         console.log(projects)
         insertProjectsOnTable(projects);
     });

     $.get('/semdono')
        .done(function(projetos){
        projects = JSON.parse(projetos);
        console.log(projects)
        insertSemDono(projects);
      });
    
    function insertProjectsOnTable(projecs) {
    
        let tbody = $('[data-projects-table-body]');
    
        projecs.forEach(project => {
          let tr = $.parseHTML(`
            <tr data-project-item="${ project._id }">
              <th scope="row">${ project.titulo }</th>
              <td data-timeline-show></td>
              <td>
                <a href="#" data-toggle="modal" data-target="#modal-mais-info">Mais informações</a>
              </td>
            </tr>
          `);
    
          let $tr = $(tr);
    
          $tr.click(function(e) {
            
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
                
                if (!project[item.key].length) {
                  item.element.addClass('d-none');
                  return;
                }
                else {
                  project[item.key].forEach(x => {
                    contentElement.append($.parseHTML(`<li>${x}</li>`));
                  });
                }
              }
            });
          });
    
          timeline.insertTimeline($tr.find('[data-timeline-show]').get(0), project);
    
          tbody.append(tr);
        });
    }


    function insertSemDono(projecs) {
    
      let tbody = $('[data-semdono-table-body]');
  
      projecs.forEach(project => {
        let tr2 = $.parseHTML(`<tr data-project-item="${ project._id }> 
          <th scope="row">${ project.titulo }</th>
              <td>${ project.titulo }</td>
              <td>${ project['descricao-breve'] }</td>
              <td>${ project['responsavel-empresario']}</td>
              <td>Nome da Empresa</td>
              <td>000111222333</td>
              <td class='text-center'>Atribuir <img id='${ project._id }' src='imgs/enter.svg' alt='' width='20px' 
              style='cursor:pointer' id='atribuir' ></td>
          </tr>
        `);
  
        let $tr2 = $(tr2);
  
        $tr2.click(function(e) {
          
          e.preventDefault();
          
          $.post("/semdono", JSON.stringify({'_id':project._id, 'responsavel-cadi': sessionStorage.getItem("sess_email_cadi")}), "json");
          location.reload();
          
        });

        tbody.append(tr2);
      });
  }
    
});
