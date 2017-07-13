package services;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

import conexion.ConnectionData;
import logic.LogicAddress;
import logic.LogicLoginAuthent;
import vo.Address;

@Path("/AppAddressCRUD")

public class WebServiceAddress {
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listAddress(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR DIRECCIONES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject addresses = new JSONObject();
			addresses.put("username", username);
			addresses.put("logincode", logincode);	
			addresses = LogicLoginAuthent.valLogin(request.getRemoteAddr(), addresses);
			if (addresses.getString("validate").equals("true")) {
				addresses = LogicAddress.getAddressesJSON();
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando addresses\n");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject addresses = new JSONObject();
			addresses.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createAddress(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("address") String address,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider,
	          @DefaultValue("null") @QueryParam("idCity") String idCity,
	          @DefaultValue("null") @QueryParam("idClient") String idClient
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR DIRECCIONES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject addresses = new JSONObject();
			addresses.put("username", username);
			addresses.put("logincode", logincode);	
			addresses = LogicLoginAuthent.valLogin(request.getRemoteAddr(), addresses);
			if (addresses.getString("validate").equals("true")) {
				if (idClient.equals("null")) {
					Address city = new Address(0, address, Long.parseLong(idProvider),Long.parseLong(idCity),0);
					return Response.ok(LogicAddress.createAddress(city).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}				
				if (idProvider.equals("null")) {
					Address city = new Address(0, address, 0,Long.parseLong(idCity),Long.parseLong(idClient));
					return Response.ok(LogicAddress.createAddress(city).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}
				addresses.put("create", "false");
				addresses.put("status", "id provedor o id cliente erroneos");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando addresses\n");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject addresses = new JSONObject();
			addresses.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateAddress(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idAddress") String idAddress,
	          @DefaultValue("null") @QueryParam("address") String address,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider,
	          @DefaultValue("null") @QueryParam("idCity") String idCity,
	          @DefaultValue("null") @QueryParam("idClient") String idClient
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nACTUALIZAR DIRECCIONES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject addresses = new JSONObject();
			addresses.put("username", username);
			addresses.put("logincode", logincode);	
			addresses = LogicLoginAuthent.valLogin(request.getRemoteAddr(), addresses);
			if (addresses.getString("validate").equals("true")) {
				if (idClient.equals("null")) {
					Address addressObj = new Address(Long.parseLong(idAddress), address, Long.parseLong(idProvider),Long.parseLong(idCity),0);
					return Response.ok(LogicAddress.updateAddress(addressObj).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}				
				if (idProvider.equals("null")) {
					Address addressObj = new Address(Long.parseLong(idAddress), address, 0,Long.parseLong(idCity),Long.parseLong(idClient));
					return Response.ok(LogicAddress.updateAddress(addressObj).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
				}
				addresses.put("update", "false");
				addresses.put("status", "id provedor o id cliente erroneos");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando addresses\n");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject addresses = new JSONObject();
			addresses.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteAddress(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idAddress") String idAddress
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nBORRAR DIRECCIONES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject addresses = new JSONObject();
			addresses.put("username", username);
			addresses.put("logincode", logincode);	
			addresses = LogicLoginAuthent.valLogin(request.getRemoteAddr(), addresses);
			if (addresses.getString("validate").equals("true")) {
				return Response.ok(LogicAddress.deleteAddress(Long.parseLong(idAddress)).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando addresses\n");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject addresses = new JSONObject();
			addresses.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }

}
