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
	    	
	    model.addCADI(Document.parse("{'email':'johndoe@email','name':'John', 'senha':'11111'}"));
			
		FindIterable<Document> found = model.login("John");
		
		model.addCADI(Document.parse("{'name':'joseph', 'etapa':'4'}"));
		model.addCADI(Document.parse("{'name':'pedro', 'etapa':'1'}"));
		
    }
    
    
    public static void inicializarPesquisa(){

    
    }
}
