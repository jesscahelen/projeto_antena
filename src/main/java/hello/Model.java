package hello;


import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;

import com.github.fakemongo.Fongo;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Model{
	
	
	Fongo fongo = new Fongo("app");
	
	public String search(String chave, String valor){
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projects = db.getCollection("projeto");
		FindIterable<Document> found = projects.find(new Document(chave, valor));
		String foundJson = StreamSupport.stream(found.spliterator(), false)
	            .map(Document::toJson)
	            .collect(Collectors.joining(", ", "[", "]"));
		//System.out.println(foundJson);
		return foundJson;
	}
	
	
	
	public void addCADI(Document doc) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> researches = db.getCollection("cadi");
    	researches.insertOne(doc);
	}
	
	public void addProjeto(Document doc) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projeto = db.getCollection("projeto");
    	projeto.insertOne(doc);
	}
	
	public FindIterable<Document> login(String name) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> cadi = db.getCollection("cadi");
		FindIterable<Document> found = cadi.find(new Document("name", name));
		
		return found;
		
	}
	
}
