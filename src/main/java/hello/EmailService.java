package hello;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.bson.Document;

import java.util.Base64;

public class EmailService {
    private static final String HOST = "smtp.gmail.com";
    private static final int PORT = 465;
    private static final boolean SSL_FLAG = true;

    private Document destinatario;

    public EmailService(Document destinatario) {
        this.destinatario = destinatario;
    }

    public void sendSimpleEmail() {
        String userName = "sendEmailMD@gmail.com";
        String password = "210418md";

        String fromAddress="sendEmailMD@gmail.com";

        try {
            String basemeiaquatro = Base64.getEncoder().encodeToString(this.destinatario.getString("email").getBytes());

            Email simpleEmail = new SimpleEmail();
            simpleEmail.setHostName(HOST);
            simpleEmail.setSmtpPort(PORT);
            simpleEmail.setAuthenticator(new DefaultAuthenticator(userName, password));
            simpleEmail.setSSLOnConnect(SSL_FLAG);
            simpleEmail.setFrom(fromAddress);
            simpleEmail.setSubject("Antenas - Sua confirmação de conta ");
            simpleEmail.setMsg("Por favor, para confirmar sua conta, clique no link: http://127.0.0.1:8083/active/"+basemeiaquatro);
            simpleEmail.addTo(this.destinatario.getString("email"));
            simpleEmail.send();
        }catch(Exception ex){
            System.out.println("Unable to send email");
            ex.printStackTrace();
        }
    }
}