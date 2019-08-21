package hello;

import static spark.Spark.post;

import org.bson.Document;

import com.google.gson.Gson;


import spark.Request;
import spark.Response;
import spark.Route;

public class Controller {
	
	private Model model;
	public void inserirCADI() {
		
		post("/cadi", new Route() {

			@Override
			public Object handle(Request request, Response response) throws Exception {
				
				response.header("Access-Control-Allow-Origin", "*");
				
				String json = request.body();
				
				Gson gson = new Gson();
				Document cadi =  gson.fromJson(json, Document.class);
				
				model.addCADI(cadi);
				
				
				return "Tese";
			}
			
		   
		});     
	}
}
