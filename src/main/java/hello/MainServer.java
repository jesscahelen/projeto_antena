package hello;

import static spark.Spark.*;

import org.bson.Document;

import com.mongodb.client.FindIterable;
//import org.json.me;


public class MainServer {
	
	final static Model model = new Model();
	
    public static void main(String[] args) {

		// Get port config of heroku on environment variable
        ProcessBuilder process = new ProcessBuilder();
        Integer port;
        if (process.environment().get("PORT") != null) {
            port = Integer.parseInt(process.environment().get("PORT"));
        } else {
            port = 8083;
        }
        port(port);

		//Servir conteudo html, css e javascript
		staticFileLocation("/static");

		inicializarPesquisa();

		Controller controller = new Controller(model);
		
		controller.inserirCADI();
	    controller.search();
	    controller.loginCadi();
	    	
	    //model.addCADI(Document.parse("{'email':'johndoe@email','name':'John', 'senha':'11111'}"));
			
		
    }
    
    
    public static void inicializarPesquisa(){
    	
    		
		model.addProjeto(Document.parse("{'nome':'projetox', 'fase':'3', 'responsavel-cadi':'jesuka@aaa.com'}"));
		model.addProjeto(Document.parse("{'name':'projectyas', 'fase':'1', 'responsavel-cadi':''}"));
    
    }
}
