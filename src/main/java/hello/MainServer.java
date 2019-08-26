package hello;

import static spark.Spark.*;

import org.bson.Document;
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
		
    }
    
    
    public static void inicializarPesquisa(){

    	
    }
}
