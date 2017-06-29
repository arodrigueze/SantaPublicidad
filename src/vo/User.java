package vo;



public class User {

	private long idUser;
	private String document;
	private String name;
	private String userName;
	private String password;
	private long idArea;
	private String email;
	private boolean active;
	
	public User(long idUser, String document, String name, String userName, String password, long idArea, String email,
			boolean active) {
		this.idUser = idUser;
		this.document = document;
		this.name = name;
		this.userName = userName;
		this.password = password;
		this.idArea = idArea;
		this.email = email;
		this.active = active;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getIdArea() {
		return idArea;
	}

	public void setIdArea(long idArea) {
		this.idArea = idArea;
	}

	@Override
	public String toString() {
		return "User [idUser=" + idUser + ", document=" + document + ", name=" + name + ", userName=" + userName
				+ ", password=" + password + ", idArea=" + idArea + ", email=" + email + "]";
	}
	
}
