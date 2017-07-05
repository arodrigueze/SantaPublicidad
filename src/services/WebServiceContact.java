package services;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

import conexion.ConnectionData;
import logic.LogicContact;
import logic.LogicLoginAuthent;
import vo.Contact;

@Path("/AppContactCRUD")
public class WebServiceContact {
		
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listContact(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR CONTACTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject contacts = new JSONObject();
			contacts.put("username", username);
			contacts.put("logincode", logincode);	
			contacts = LogicLoginAuthent.valLogin(request.getRemoteAddr(), contacts);
			if (contacts.getString("validate").equals("true")) {
				contacts = LogicContact.getContactsJSON();
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando contacts\n");
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject contacts = new JSONObject();
			contacts.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createContact(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("name") String name,
	          @DefaultValue("null") @QueryParam("email") String email,
	          @DefaultValue("null") @QueryParam("phoneNumber") String phoneNumber,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider,
	          @DefaultValue("null") @QueryParam("idClient") String idClient
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR CONTACTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject contacts = new JSONObject();
			contacts.put("username", username);
			contacts.put("logincode", logincode);	
			contacts = LogicLoginAuthent.valLogin(request.getRemoteAddr(), contacts);
			if (contacts.getString("validate").equals("true")) {
				if (idClient.equals("null")) {
					Contact contact = new Contact(0, name, email, phoneNumber, Long.parseLong(idProvider), 0);
					return Response.ok(LogicContact.createContact(contact).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}				
				if (idProvider.equals("null")) {
					Contact contact = new Contact(0, name, email, phoneNumber, 0,Long.parseLong(idClient));
					return Response.ok(LogicContact.createContact(contact).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}
				contacts.put("create", "false");
				contacts.put("status", "id provedor o id cliente erroneos");
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando contacts\n");
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject contacts = new JSONObject();
			contacts.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateContact(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idContact") String idContact,
	          @DefaultValue("null") @QueryParam("name") String name,
	          @DefaultValue("null") @QueryParam("email") String email,
	          @DefaultValue("null") @QueryParam("phoneNumber") String phoneNumber,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider,
	          @DefaultValue("null") @QueryParam("idClient") String idClient
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nACTUALIZAR CONTACTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject contacts = new JSONObject();
			contacts.put("username", username);
			contacts.put("logincode", logincode);	
			contacts = LogicLoginAuthent.valLogin(request.getRemoteAddr(), contacts);
			if (contacts.getString("validate").equals("true")) {
				if (idClient.equals("null")) {
					Contact contact = new Contact(Long.parseLong(idContact), name, email, phoneNumber, Long.parseLong(idProvider), 0);
					return Response.ok(LogicContact.updateContact(contact).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}				
				if (idProvider.equals("null")) {
					Contact contact = new Contact(Long.parseLong(idContact), name, email, phoneNumber, 0,Long.parseLong(idClient));
					return Response.ok(LogicContact.updateContact(contact).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}
				contacts.put("update", "false");
				contacts.put("status", "id provedor o id cliente erroneos");
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando contacts\n");
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject contacts = new JSONObject();
			contacts.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteContact(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idContact") String idContact
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nBORRAR CONTACTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject contacts = new JSONObject();
			contacts.put("username", username);
			contacts.put("logincode", logincode);	
			contacts = LogicLoginAuthent.valLogin(request.getRemoteAddr(), contacts);
			if (contacts.getString("validate").equals("true")) {
				return Response.ok(LogicContact.deleteContact(Long.parseLong(idContact)).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando contacts\n");
				return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject contacts = new JSONObject();
			contacts.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(contacts.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
}
