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
import logic.LogicCity;
import logic.LogicLoginAuthent;
import vo.City;

@Path("/AppCityCRUD")

public class WebServiceCity {
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listCity(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR CIUDADES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject cities = new JSONObject();
			cities.put("username", username);
			cities.put("logincode", logincode);	
			cities = LogicLoginAuthent.valLogin(request.getRemoteAddr(), cities);
			if (cities.getString("validate").equals("true")) {
				cities = LogicCity.getCitiesJSON();
				return Response.ok(cities.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando cities\n");
				return Response.ok(cities.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject cities = new JSONObject();
			cities.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(cities.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createCity(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("name") String name,
	          @DefaultValue("null") @QueryParam("idCountry") String idCountry
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR CIUDADES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject cities = new JSONObject();
			cities.put("username", username);
			cities.put("logincode", logincode);	
			cities = LogicLoginAuthent.valLogin(request.getRemoteAddr(), cities);
			if (cities.getString("validate").equals("true")) {
				City city = new City(0, name, Long.parseLong(idCountry));
				return Response.ok(LogicCity.createCity(city).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando cities\n");
				return Response.ok(cities.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject cities = new JSONObject();
			cities.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(cities.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteCity(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idCity") String idCity, 
			  @DefaultValue("null") @QueryParam("username") String username,
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tBORRAR CIUDADES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject city = new JSONObject();
			city.put("username", username);
			city.put("logincode", logincode);	
			city = LogicLoginAuthent.valLogin(request.getRemoteAddr(), city);
			if (city.getString("validate").equals("true")) {
				return Response.ok(LogicCity.deleteCity(idCity).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(city.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject city = new JSONObject();
			city.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(city.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateCity(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idCity") String idCity,
			  @DefaultValue("null") @QueryParam("name") String name, 
			  @DefaultValue("null") @QueryParam("idCountry") String idCountry,
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("username") String username
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn EDITAR CIUDADES");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				City city = new City(Long.parseLong(idCity), name, Long.parseLong(idCountry));
				return Response.ok(LogicCity.updateCity(city).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
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
