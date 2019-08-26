package hello;


import org.bson.Document;
import com.github.fakemongo.Fongo;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Model{
	
	
	Fongo fongo = new Fongo("app");
	
	public FindIterable<Document> searchByEtapa(String etapa){
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projects = db.getCollection("projects");
		FindIterable<Document> found = projects.find(new Document("etapa", etapa));
		return found;
	}
	
	public FindIterable<Document> searchByEmpresa(String empresa){
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projects = db.getCollection("projects");
		FindIterable<Document> found = projects.find(new Document("empresa", empresa));
		return found;
	}
	
	public FindIterable<Document> searchByProfessor(String professor){
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projects = db.getCollection("projects");
		FindIterable<Document> found = projects.find(new Document("professor", professor));
		return found;
	}
	
	public FindIterable<Document> searchByName(String name){//collection de documents
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projetos = db.getCollection("projects");
    	FindIterable<Document> found = projetos.find(new Document("name", name));
   
    	return found;
    }
	
	public void addCADI(Document doc) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> researches = db.getCollection("cadi");
    	researches.insertOne(doc);
	}
	public Document login(String name) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> cadi = db.getCollection("cadi");
		Document found = cadi.find(new Document("name", name)).first();
		
		return found;
		
	}
	
}
