package hello;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;
import org.json.JSONException;
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
		post("/cadi", new Route(){
			@Override
			public Object handle(Request request, Response response) throws Exception {
				response.header("Access-Control_Allow-Origin", "*");
				
				JSONObject json = new JSONObject(request.body());
				String email = json.getString("email");
				String senha = json.getString("senha");
				try {
					Document cadi = model.login(email, senha);
						System.out.println(cadi);
						return cadi.toJson();
					
				}catch(NullPointerException e) {
					return null;
				}
				
			}
		});
	}
	
	public void inserirCADI() {
		
		post("/cadicadastro", (Request request, Response response) -> {

			
				System.out.println("Chamou");
				response.header("Access-Control-Allow-Origin", "*");
				
				Document cadi =  Document.parse(request.body());
				
				model.addCADI(cadi);
				
				return cadi.toJson();
		});     
	}
	
	public void projetos() {
		get("/projetos", new Route() {
			@Override
			public Object handle(final Request request, final Response response) {

				 FindIterable<Document> projectsFound = model.listaProjetos();

				 return StreamSupport.stream(projectsFound.spliterator(), false)
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
