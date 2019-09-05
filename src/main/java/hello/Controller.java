package hello;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;
import org.json.JSONObject;

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


	public void loginCadi() {
		post("/login/cadi", new Route(){
			@Override
			public Object handle(Request request, Response response) throws Exception {
				response.header("Access-Control_Allow-Origin", "*");
				
				JSONObject json = new JSONObject(request.body());
				
				String email = json.getString("email");
				
				String senha = json.getString("senha");
				
				Document cadi = model.login(email, senha);
				
				return cadi.toJson();
			}
		});
	}
	
	public void inserirCADI() {
		
		post("/cadi", (Request request, Response response) -> {

			
				System.out.println("Chamou");
				response.header("Access-Control-Allow-Origin", "*");
				
				Document cadi =  Document.parse(request.body());
				
				model.addCADI(cadi);
				
				return cadi.toJson();

				
			
			
		   
		});     
	}
	
	public void search() {
		
		get("/search", (request, response) -> {
			return model.search(request.queryParams("chave"), request.queryParams("valor"));
		});
		

		
	}



}
