package vo.vista;

import java.util.ArrayList;
import java.util.List;
import vo.Budget;

public class ProjectListJSON {
	
	private long idProject;
	private String name;
	private long idClient;
	private long User_idUser;
	private List<Budget> presupuestos;
	
	public ProjectListJSON(long idProject, String name, long idClient, long user_idUser) {
		super();
		this.idProject = idProject;
		this.name = name;
		this.idClient = idClient;
		User_idUser = user_idUser;
		presupuestos = new ArrayList<>();
	}

	public long getIdProject() {
		return idProject;
	}

	public void setIdProject(long idProject) {
		this.idProject = idProject;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getIdClient() {
		return idClient;
	}

	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}

	public long getUser_idUser() {
		return User_idUser;
	}

	public void setUser_idUser(long user_idUser) {
		User_idUser = user_idUser;
	}

	public List<Budget> getPresupuestos() {
		return presupuestos;
	}

	public void addPresupuestos(Budget presupuesto) {
		this.presupuestos.add(presupuesto);
	}

	@Override
	public String toString() {
		return "ProjectListJSON [idProject=" + idProject + ", name=" + name + ", idClient=" + idClient
				+ ", User_idUser=" + User_idUser + ", presupuestos=" + presupuestos + "]";
	}
}
