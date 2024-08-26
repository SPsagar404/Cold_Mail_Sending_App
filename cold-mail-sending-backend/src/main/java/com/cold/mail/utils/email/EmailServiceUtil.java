package com.cold.mail.utils.email;

import com.cold.mail.modal.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Component
public class EmailServiceUtil {

    @Autowired
    private JavaMailSender mailSender;

    public  boolean isEmailSent(User user){
        boolean isMailSent = false;
        String subject = "Application for Java Full Stack Developer Position";
        String htmlFilePath = "static/email-template.html";
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
            helper.setTo(user.getEmail());
            helper.setSubject(subject);

            String template = new String(Files.readAllBytes(Paths.get(new ClassPathResource("static/email-template.html").getURI())));
            template = processTemplate(template, placeholders(user));

            helper.setText(template,true);

            ClassPathResource pdfResource = new ClassPathResource("static/resume.pdf");
            helper.addAttachment("resume.pdf", pdfResource);

            mailSender.send(mimeMessage);
            isMailSent = true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return isMailSent;
    }

    private String readHtmlFile(String htmlFilePath) throws MessagingException, IOException {
        Path path = new ClassPathResource(htmlFilePath).getFile().toPath();
        String htmlContent;
        try {
            htmlContent = Files.readString(path);
        } catch (IOException e) {
            throw new MessagingException("Error reading HTML file", e);
        }
        return htmlContent;
    }

    private String processTemplate(String template, Map<String, String> placeholders) {
        String processedTemplate = template;
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            processedTemplate = processedTemplate.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return processedTemplate;
    }

    private Map<String,String> placeholders(User user){
        Map<String,String> placeholder = new HashMap<>();
        placeholder.put("hiringManagerName", user.getName());
        placeholder.put("yourName", "Sagar Pujari");
        placeholder.put("experience", "2.1 years");
        placeholder.put("jobTitle", "Java Full Stack Developer");
        placeholder.put("companyName", user.getOrganisation());
        placeholder.put("contactNumber","+91 9561691569");
        placeholder.put("currentCompany","Bornemindz");
        return placeholder;
    }

}
