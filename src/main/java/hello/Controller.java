package hello;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;

import com.mongodb.client.FindIterable;

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
				
				FindIterable<Document> encontrado =  model.login("John");
				
				
				return StreamSupport.stream(encontrado.spliterator(), false)
				        .map(Document::toJson)
				        .collect(Collectors.joining(", ", "[", "]"));
				
			}
			
		   
		});     
	}
	
	public void search() {
		
		get("/search", (request, response) -> {
			return model.search(request.queryParams("chave"), request.queryParams("valor"));
		});
		

		
	}



}
