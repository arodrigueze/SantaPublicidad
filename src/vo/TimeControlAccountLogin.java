package vo;

public class TimeControlAccountLogin {
	private String ipUsername;
	private long attemptCount;
	private long startTime;
	private long stopTime;
	
	public TimeControlAccountLogin(String ipUsername, long attemptCount, long startTime, long stopTime) {
		this.ipUsername = ipUsername;
		this.attemptCount = attemptCount;
		this.startTime = startTime;
		this.stopTime = stopTime;
	}

	public String getIp() {
		return ipUsername;
	}

	public void setIp(String ipUsername) {
		this.ipUsername = ipUsername;
	}

	public long getAttemptCount() {
		return attemptCount;
	}

	public void setAttemptCount(long attemptCount) {
		this.attemptCount = attemptCount;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public long getStopTime() {
		return stopTime;
	}

	public void setStopTime(long stopTime) {
		this.stopTime = stopTime;
	}	
}
