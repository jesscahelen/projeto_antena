package hello;

import static spark.Spark.post;

import org.bson.Document;
import org.json.JSONArray;

import com.google.gson.Gson;


import spark.Request;
import spark.Response;
import spark.Route;

public class Controller {
	
	private Model model;
	
	
	public Controller(Model model) {
		super();
		this.model = model;
	}


	public void inserirCADI() {
		
		post("/cadi", new Route() {

			@Override
			public Object handle(Request request, Response response) throws Exception {
				System.out.println("Chamou");
				response.header("Access-Control-Allow-Origin", "*");
				
				Document cadi =  Document.parse(request.body());
				
				model.addCADI(cadi);
				
				Document encontrado =  model.login("rone");
				
				JSONArray jsonResult = new JSONArray();
				jsonResult.put(encontrado);
				
				return jsonResult;
				
			}
			
		   
		});     
	}
}
