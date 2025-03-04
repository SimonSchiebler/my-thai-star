package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.application.mtsj.ordermanagement.common.api.Order;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of Order
 */
public class OrderEto extends AbstractEto implements Order {

	private static final long serialVersionUID = 1L;

	private Long bookingId;

	private Long invitedGuestId;

	private String bookingToken;

	private Long state;

	private Long paidId;

	private String orderToken;

	/**
	 * @return bookingToken
	 */
	public String getBookingToken() {

		return this.bookingToken;
	}

	/**
	 * @param bookingToken new value of {@link #setbookingToken}.
	 */
	public void setBookingToken(String bookingToken) {

		this.bookingToken = bookingToken;
	}

	private Long hostId;

	@Override
	public Long getBookingId() {

		return this.bookingId;
	}

	@Override
	public void setBookingId(Long bookingId) {

		this.bookingId = bookingId;
	}

	@Override
	public Long getInvitedGuestId() {

		return this.invitedGuestId;
	}

	@Override
	public void setInvitedGuestId(Long invitedGuestId) {

		this.invitedGuestId = invitedGuestId;
	}

	@Override
	public int hashCode() {

		final int prime = 31;
		int result = super.hashCode();

		result = prime * result + ((this.bookingId == null) ? 0 : this.bookingId.hashCode());

		result = prime * result + ((this.invitedGuestId == null) ? 0 : this.invitedGuestId.hashCode());

		return result;
	}

	@Override
	public boolean equals(Object obj) {

		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		// class check will be done by super type EntityTo!
		if (!super.equals(obj)) {
			return false;
		}
		OrderEto other = (OrderEto) obj;

		if (this.bookingId == null) {
			if (other.bookingId != null) {
				return false;
			}
		} else if (!this.bookingId.equals(other.bookingId)) {
			return false;
		}

		if (this.invitedGuestId == null) {
			if (other.invitedGuestId != null) {
				return false;
			}
		} else if (!this.invitedGuestId.equals(other.invitedGuestId)) {
			return false;
		}

		return true;
	}

	@Override
	public Long getHostId() {

		return this.hostId;
	}

	@Override
	public void setHostId(Long hostId) {

		this.hostId = hostId;
	}

	@Override
	public Long getStateId() {

		return this.state;
	}

	@Override
	public void setStateId(Long state) {

		this.state = state;
	}

	@Override
	public Long getPaidId() {

		return this.paidId;
	}

	@Override
	public void setPaidId(Long paidId) {

		this.paidId = paidId;

	}

	@Override
	public String getOrderToken() {

		return this.orderToken;
	}

	@Override
	public void setOrderToken(String OrderToken) {

		this.orderToken = OrderToken;
	}

}
