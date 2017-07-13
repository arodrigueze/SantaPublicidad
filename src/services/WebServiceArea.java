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
import logic.LogicArea;
import logic.LogicLoginAuthent;
import vo.Area;


@Path("/AppAreaCRUD")

public class WebServiceArea {
		
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createArea(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("nombreArea") String nombreArea
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR AREA");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject areas = new JSONObject();
			areas.put("username", username);
			areas.put("logincode", logincode);	
			areas = LogicLoginAuthent.valLogin(request.getRemoteAddr(), areas);
			if (areas.getString("validate").equals("true")) {
				Area area = new Area(0, nombreArea);
				return Response.ok(LogicArea.createArea(area).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando areas\n");
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject areas = new JSONObject();
			areas.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listArea(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR AREAS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject areas = new JSONObject();
			areas.put("username", username);
			areas.put("logincode", logincode);	
			areas = LogicLoginAuthent.valLogin(request.getRemoteAddr(), areas);
			if (areas.getString("validate").equals("true")) {
				areas = LogicArea.getAreasJSON();
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando areas\n");
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject areas = new JSONObject();
			areas.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateArea(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idArea") String idArea,
	          @DefaultValue("null") @QueryParam("name") String nameArea
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nACTUALIZAR AREAS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject areas = new JSONObject();
			areas.put("username", username);
			areas.put("logincode", logincode);	
			areas = LogicLoginAuthent.valLogin(request.getRemoteAddr(), areas);
			if (areas.getString("validate").equals("true")) {
				Area areaObj = new Area(Long.parseLong(idArea), nameArea);
				return Response.ok(LogicArea.updateArea(areaObj).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando areas\n");
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject areas = new JSONObject();
			areas.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteArea(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idArea") String idArea
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nBORRAR AREAS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject areas = new JSONObject();
			areas.put("username", username);
			areas.put("logincode", logincode);	
			areas = LogicLoginAuthent.valLogin(request.getRemoteAddr(), areas);
			if (areas.getString("validate").equals("true")) {
				return Response.ok(LogicArea.deleteArea(Long.parseLong(idArea)).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando areas\n");
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject areas = new JSONObject();
			areas.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
}
