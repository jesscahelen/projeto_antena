package hello;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.github.fakemongo.Fongo;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.FindOneAndUpdateOptions;

public class Model {

	Fongo fongo = new Fongo("app");

	public String search(String chave, String valor) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projects = db.getCollection("projeto");
		FindIterable<Document> found = projects.find(new Document(chave, valor));
		String foundJson = StreamSupport.stream(found.spliterator(), false).map(Document::toJson)
				.collect(Collectors.joining(", ", "[", "]"));
		// System.out.println(foundJson);
		return foundJson;
	}
	public FindIterable<Document> buscaPorDono(String email) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projetos = db.getCollection("projeto");
		FindIterable<Document> found = projetos.find(new Document("responsavel-cadi", email));

		return found;
	}
	public String buscaSemDono() {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projects = db.getCollection("projeto");
		FindIterable<Document> found = projects.find(new Document("responsavel-cadi", ""));
		String foundJson = StreamSupport.stream(found.spliterator(), false).map(Document::toJson)
				.collect(Collectors.joining(", ", "[", "]"));
		// System.out.println(foundJson);
		return foundJson;
	}
	
	public Bson atribuirProfessor(Document projeto) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projetos = db.getCollection("projeto");
    	BasicDBObject query = new BasicDBObject();
    	query.append("_id", projeto.get("_id"));
    	Bson newDocument = new Document("$set", projeto);
    	return projetos.findOneAndUpdate(query, newDocument, (new FindOneAndUpdateOptions()).upsert(true));
	}
	
	public Bson atribuirCADI(Document projeto) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projetos = db.getCollection("projeto");
    	BasicDBObject query = new BasicDBObject();
    	query.append("_id", projeto.get("_id"));
    	Bson newDocument = new Document("$set", projeto);
    	return projetos.findOneAndUpdate(query, newDocument, (new FindOneAndUpdateOptions()).upsert(true));
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
	
	//teste
	public void addProfessores(Document doc) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> professor = db.getCollection("professor");
		professor.insertOne(doc);
	}

	public Document login(String email, String senha) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> cadi = db.getCollection("cadi");
		Document found = cadi.find(new Document("email", email).append("senha", senha)).first();

		return found;

	}

	public FindIterable<Document> listaProjetos() {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projetos = db.getCollection("projeto");
		FindIterable<Document> found = projetos.find();
		return found;
	}

	public Document updateProjeto(Document projeto) {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> projetos = db.getCollection("projeto");
		BasicDBObject query = new BasicDBObject();
		query.append("_id", projeto.get("_id"));
		Bson newDocument = new Document("$set", projeto);
		return projetos.findOneAndUpdate(query, newDocument, (new FindOneAndUpdateOptions()).upsert(true));
	}
	
	public List<String> listCadi() {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> cadiF = db.getCollection("cadi");
		FindIterable<Document> cadi= cadiF.find();
		List<String> listCadi = new ArrayList<String>();
		for(Document proj:cadi) {
			listCadi.add(proj.toJson());
		}
		return listCadi;
	}
	
	//test profs
	public FindIterable<Document> listProf() {
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> prof = db.getCollection("professor");
		FindIterable<Document> found = prof.find();
		return found;
	}

	public void alterarId (String id, Document alteracao){
		Document filter = new Document("id", id);
		MongoDatabase db = fongo.getDatabase("app");
		MongoCollection<Document> cadiF = db.getCollection("cadi");
		cadiF.updateOne(filter, alteracao);
		}
	

}
