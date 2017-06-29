package vo;

import java.math.BigDecimal;

public class Value {
	
	private long idValue;
	private String name;
	private BigDecimal value;
	
	public Value(long idValue, String name, BigDecimal value) {
		this.idValue = idValue;
		this.name = name;
		this.value = value;
	}

	public long getIdValue() {
		return idValue;
	}

	public void setIdValue(long idValue) {
		this.idValue = idValue;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "Value [idValue=" + idValue + ", name=" + name + ", value=" + value + "]";
	}
}
