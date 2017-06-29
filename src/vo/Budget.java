package vo;

import java.math.BigDecimal;
import java.sql.Date;

public class Budget {
	
	private long idBudget;
	private String observations;
	private Date date;
	private String commercialTerms;
	private BigDecimal bruteTotal;
	private BigDecimal IVA;
	private int months;
	private BigDecimal activityTotal;
	private long idProject;
	
	public Budget(long idBudget, String observations, Date date, String commercialTerms, BigDecimal bruteTotal,
			BigDecimal iVA, int months, BigDecimal activityTotal, long idProject) {
		this.idBudget = idBudget;
		this.observations = observations;
		this.date = date;
		this.commercialTerms = commercialTerms;
		this.bruteTotal = bruteTotal;
		IVA = iVA;
		this.months = months;
		this.activityTotal = activityTotal;
		this.idProject = idProject;
	}

	public long getIdBudget() {
		return idBudget;
	}

	public void setIdBudget(long idBudget) {
		this.idBudget = idBudget;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCommercialTerms() {
		return commercialTerms;
	}

	public void setCommercialTerms(String commercialTerms) {
		this.commercialTerms = commercialTerms;
	}

	public BigDecimal getBruteTotal() {
		return bruteTotal;
	}

	public void setBruteTotal(BigDecimal bruteTotal) {
		this.bruteTotal = bruteTotal;
	}

	public BigDecimal getIVA() {
		return IVA;
	}

	public void setIVA(BigDecimal iVA) {
		IVA = iVA;
	}

	public int getMonths() {
		return months;
	}

	public void setMonths(int months) {
		this.months = months;
	}

	public BigDecimal getActivityTotal() {
		return activityTotal;
	}

	public void setActivityTotal(BigDecimal activityTotal) {
		this.activityTotal = activityTotal;
	}

	public long getIdProject() {
		return idProject;
	}

	public void setIdProject(long idProject) {
		this.idProject = idProject;
	}

	@Override
	public String toString() {
		return "Budget [idBudget=" + idBudget + ", observations=" + observations + ", date=" + date
				+ ", commercialTerms=" + commercialTerms + ", bruteTotal=" + bruteTotal + ", IVA=" + IVA + ", months="
				+ months + ", activityTotal=" + activityTotal + ", idProject=" + idProject + "]";
	}
}
