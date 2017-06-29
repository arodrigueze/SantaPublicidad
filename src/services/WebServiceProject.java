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
import dao.ConnectionData;
import logic.LogicProject;
import logic.LogicLoginAuthent;
import vo.Project;

@Path("/AppProjectCRUD")

public class WebServiceProject {
		
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listProject(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.println("\tEn listar project\nEN LISTAR PROYECTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicProject.getProjectJSON();
				account.put("validate", "true");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error en validacion\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("validate", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createProject(@Context HttpServletRequest request, @HeaderParam("Referer") String referer, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("idClient") String idClient,
			  @DefaultValue("null") @QueryParam("User_idUser") String User_idUser,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn INSERTAR PROYECTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				Project project = new Project(0, name, Long.parseLong(idClient), Long.parseLong(User_idUser),true);
				return Response.ok(LogicProject.insertProject(project).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteProject(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idProject") String idProject, 
			  @DefaultValue("null") @QueryParam("username") String username,
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tBORRAR PROYECTO");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicProject.deleteProject(idProject);
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateProject(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idProject") String idProject,
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("idClient") String idClient,
			  @DefaultValue("null") @QueryParam("User_idUser") String User_idUser,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn EDITAR PROYECTO");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				Project project = new Project(Long.parseLong(idProject), name, Long.parseLong(idClient), Long.parseLong(User_idUser),true);
				return Response.ok(LogicProject.updateProject(project).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }	
}
