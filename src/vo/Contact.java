package vo;

public class Contact {
	private long idContact;
	private String name;
	private String email;
	private String phoneNumber;
	private long idProvider;
	private long idClient;
	
	public Contact(long idContact, String name, String email, String phoneNumber, long idProvider, long idClient) {
		this.idContact = idContact;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.idProvider = idProvider;
		this.idClient = idClient;
	}

	public long getIdContact() {
		return idContact;
	}

	public void setIdContact(long idContact) {
		this.idContact = idContact;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public long getIdProvider() {
		return idProvider;
	}

	public void setIdProvider(long idProvider) {
		this.idProvider = idProvider;
	}

	public long getIdClient() {
		return idClient;
	}

	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}

	@Override
	public String toString() {
		return "Contact [idContact=" + idContact + ", name=" + name + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", idProvider=" + idProvider + ", idClient=" + idClient + "]";
	}	
}
