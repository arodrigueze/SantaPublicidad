package vo;

public class Area {
	
	private long idArea;
	private String name;
	
	public Area(long idArea, String name) {
		this.idArea = idArea;
		this.name = name;
	}
	
	public long getIdArea() {
		return idArea;
	}
	
	public void setIdArea(long idArea) {
		this.idArea = idArea;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "Area [idArea=" + idArea + ", name=" + name + "]";
	}
	
	
}
