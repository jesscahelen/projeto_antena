package hello;


import org.bson.Document;
import com.github.fakemongo.Fongo;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Model{
	
	
	Fongo fongo = new Fongo("mongo");
	
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
	
}
