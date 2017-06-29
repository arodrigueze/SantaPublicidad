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
import logic.LogicLoginAuthent;
import logic.LogicProvider;
import vo.Provider;

@Path("/AppProviderCRUD")

public class WebServiceProvider {
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listProvider(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nEN LISTAR PROVEEDORES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicProvider.getProvidersJSON();
				account.put("validate", "true");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createProvider(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("nit") String nit, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("DV") String dv,
			  @DefaultValue("null") @QueryParam("description") String description,
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("username") String username
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn CREAR PROVEEDOR");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				Provider provider = new Provider(0,nit, name, description,Integer.parseInt(dv), true);
				return Response.ok(LogicProvider.insertProvider(provider).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
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
	public Response updateProvider(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idProvider") String idProvider,
			  @DefaultValue("null") @QueryParam("nit") String nit, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("DV") String dv,
			  @DefaultValue("null") @QueryParam("description") String description,
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("username") String username
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn EDITAR PROVEEDOR");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				Provider provider = new Provider(Long.parseLong(idProvider), nit, name, description, Integer.parseInt(dv), true);
				return Response.ok(LogicProvider.updateProvider(provider).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
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
	public Response deleteUser(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idProvider") String idProvider, 
			  @DefaultValue("null") @QueryParam("username") String username,
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tBORRAR PROVEEDOR");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				return Response.ok(LogicProvider.deleteProvider(idProvider).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
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
