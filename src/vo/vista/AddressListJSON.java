package vo.vista;

public class AddressListJSON {
	private long   idAddress;	
	private String direccion;
	private String ciudad;
	private String pais;
	private long idClient;
	
	public AddressListJSON() {}
	public AddressListJSON(long idAddress, long idClient, String direccion, String ciudad, String pais) {
		this.idAddress = idAddress;
		this.direccion = direccion;
		this.ciudad = ciudad;
		this.pais = pais;
		this.idClient = idClient;
	}
	
	public long getIdClient() {
		return idClient;
	}
	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}
	public long getIdAddress() {
		return idAddress;
	}
	public void setIdAddress(long idAddress) {
		this.idAddress = idAddress;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getCiudad() {
		return ciudad;
	}
	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}
	public String getPais() {
		return pais;
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	@Override
	public String toString() {
		return "AddressListJSON [idAddress=" + idAddress + ", direccion=" + direccion + ", ciudad=" + ciudad + ", pais="
				+ pais + ", idClient=" + idClient + "]";
	}

}
