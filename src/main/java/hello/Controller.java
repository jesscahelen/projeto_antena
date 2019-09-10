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
	
	
	/* Metodo que recebe uma id pela url (ex: /alterarId?Id=8) e um json no corpo do metodo 
	com as alterações direcionadas para o objeto que tiver a Id especificada. Ex:
	{
		'professor':'fulano
	}
	
	objeto final:
	
	{
		'id': 8,
		'professor':'fulano'
	}
	*/
	
	public void alterarId(){
		post("/alterarId", (req,res) -> {
			model.alterarId(req.queryParams("id"), new Document("$set",Document.parse(req.body())));
			return model.listCadi();
		});
	}
	
	public void listCadi(){
		get("/listarCadi", (req,res) -> {
			return model.listCadi();
		});
	}
	
			


}
