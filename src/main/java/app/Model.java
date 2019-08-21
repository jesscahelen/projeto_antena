package app;

import org.bson.Document;

import com.github.fakemongo.Fongo;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Model {
	
	MongoClient client = new MongoClient();
	Fongo conn = new Fongo("Mongo");
	private MongoDatabase db = conn.getDatabase("antenas");
	
	

	public FindIterable<Document> searchByName(String name){//collection de documents
		
		MongoCollection<Document> projetos = db.getCollection("projects");
    	FindIterable<Document> found = projetos.find(new Document("name", name));
   
    	return found;
    }
	
	public void addCADI(Document doc) {
		MongoCollection<Document> researches = db.getCollection("cadi");
    	researches.insertOne(doc);
	}
	
	
}
