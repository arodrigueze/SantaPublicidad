package vo;

public class UserRoll {
	
	long idUser_Role;
	long idUser;
	long idRole;
	
	public UserRoll(long id, long idUser, long idRole) {
		this.idUser_Role = id;
		this.idUser = idUser;
		this.idRole = idRole;
	}
	
	public long getId() {
		return idUser_Role;
	}
	
	public void setId(long id) {
		this.idUser_Role = id;
	}
	
	public long getIdUser() {
		return idUser;
	}
	
	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}
	
	public long getIdRole() {
		return idRole;
	}
	
	public void setIdRole(long idRole) {
		this.idRole = idRole;
	}
	
	@Override
	public String toString() {
		return "UserRoll [id=" + idUser_Role + ", idUser=" + idUser + ", idRole=" + idRole + "]";
	}
}
