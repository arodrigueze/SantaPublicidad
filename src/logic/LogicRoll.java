package logic;

import java.util.List;

import org.json.JSONObject;

import dao.DAORoll;
import vo.Roll;

public class LogicRoll {

	public static JSONObject getRolesJSON() {
		List<Roll> roles = DAORoll.getRoll();
		JSONObject obj = new JSONObject();
		if (roles != null) {
			obj.putOnce("roles", roles);
			obj.put("accionListar", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("accionListar", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al cargar los roles");
			return obj;
		}
	}

}
