package vo;

public class AccountLogin{
	private String username;
	private String loginCode;
	private String ip;
	private String roll;
	private User user;
	
	public AccountLogin(String username, String loginCode, String ip, String roll, User user) {
		super();
		this.username = username;
		this.loginCode = loginCode;
		this.ip = ip;
		this.roll = roll;
		this.user = user;
	}

	public String getRoll() {
		return roll;
	}

	public void setRoll(String roll) {
		this.roll = roll;
	}


	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getLoginCode() {
		return loginCode;
	}
	
	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}
	
	public String getIp() {
		return ip;
	}
	
	public void setIp(String ip) {
		this.ip = ip;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "AccountLogin [username=" + username + ", loginCode=" + loginCode + ", ip=" + ip + ", roll=" + roll
				+ ", user=" + user + "]";
	}

	
}