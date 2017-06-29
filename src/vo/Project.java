package vo;

public class Project {
	
	private long idProject;
	private String name;
	private long idClient;
	private long User_idUser;
	private boolean active;
	public Project(long idProject, String name, long idClient, long user_idUser, boolean active) {
		super();
		this.idProject = idProject;
		this.name = name;
		this.idClient = idClient;
		User_idUser = user_idUser;
		this.active = active;
	}
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
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
}
