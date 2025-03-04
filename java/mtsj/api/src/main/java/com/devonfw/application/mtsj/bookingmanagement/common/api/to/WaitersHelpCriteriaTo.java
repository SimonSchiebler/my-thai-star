package com.devonfw.application.mtsj.bookingmanagement.common.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;

public class WaitersHelpCriteriaTo extends AbstractSearchCriteriaTo { 
	 
	private static final long serialVersionUID = 1L;
	
	private Long waitersHelp;
	private String deviceId;
	private Long bookingId;
	
	public Long getWaitersHelp() {
		return waitersHelp;
	}
	public void setWaitersHelp(Long waitersHelp) {
		this.waitersHelp = waitersHelp;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
	
}
