package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.devonfw.module.basic.common.api.query.StringSearchConfigTo;

/**
 * used to find
 * {@link com.devonfw.application.mtsj.ordermanagement.common.api.Order}s.
 */
public class OrderSearchCriteriaTo extends AbstractSearchCriteriaTo {

	private static final long serialVersionUID = 1L;

	private Long bookingId;

	private Long invitedGuestId;

	private String hostToken;

	private Long hostId;

	private String email;

	private String bookingToken;

	private Long[] stateId;

	private Long[] paidId;

	private Boolean delivery;

	private String orderToken;

	private StringSearchConfigTo hostTokenOption;

	private StringSearchConfigTo emailOption;

	private StringSearchConfigTo bookingTokenOption;

	private boolean archive;
	
	private boolean order_cockpit;

	public Boolean isDelivery() {
		return delivery;
	}

	public void setDelivery(Boolean delivery) {
		this.delivery = delivery;
	}

	/**
	 * The constructor.
	 */
	public OrderSearchCriteriaTo() {

		super();
	}

	public Long getBookingId() {

		return this.bookingId;
	}

	public void setBookingId(Long bookingId) {

		this.bookingId = bookingId;
	}

	public Long getInvitedGuestId() {

		return this.invitedGuestId;
	}

	public void setInvitedGuestId(Long invitedGuestId) {

		this.invitedGuestId = invitedGuestId;
	}

	public String getHostToken() {

		return this.hostToken;
	}

	public void setHostToken(String hostToken) {

		this.hostToken = hostToken;
	}

	public Long getHostId() {

		return this.hostId;
	}

	public void setHostId(Long hostId) {

		this.hostId = hostId;
	}

	public Long[] getStateId() {

		return this.stateId;
	}

	public void setStateId(Long[] stateId) {

		this.stateId = stateId;
	}

	public Long[] getPaidId() {

		return this.paidId;
	}

	public void setPaidId(Long[] paidId) {

		this.paidId = paidId;
	}

	/**
	 * @return email
	 */
	public String getEmail() {

		return this.email;
	}

	/**
	 * @param email new value of {@link #getEmail}.
	 */
	public void setEmail(String email) {

		this.email = email;
	}

	/**
	 * @return bookingToken
	 */
	public String getBookingToken() {

		return this.bookingToken;
	}

	/**
	 * @param bookingToken new value of {@link #getBookingToken}.
	 */
	public void setBookingToken(String bookingToken) {

		this.bookingToken = bookingToken;
	}

	/**
	 * @return hostTokenOption
	 */
	public StringSearchConfigTo getHostTokenOption() {

		return this.hostTokenOption;
	}

	/**
	 * @param hostTokenOption new value of {@link #gethostTokenOption}.
	 */
	public void setHostTokenOption(StringSearchConfigTo hostTokenOption) {

		this.hostTokenOption = hostTokenOption;
	}

	/**
	 * @return emailOption
	 */
	public StringSearchConfigTo getEmailOption() {

		return this.emailOption;
	}

	/**
	 * @param emailOption new value of {@link #getemailOption}.
	 */
	public void setEmailOption(StringSearchConfigTo emailOption) {

		this.emailOption = emailOption;
	}

	/**
	 * @return bookingTokenOption
	 */
	public StringSearchConfigTo getBookingTokenOption() {

		return this.bookingTokenOption;
	}

	/**
	 * @param bookingTokenOption new value of {@link #getbookingTokenOption}.
	 */
	public void setBookingTokenOption(StringSearchConfigTo bookingTokenOption) {

		this.bookingTokenOption = bookingTokenOption;
	}

	/**
	 * @return orderToken
	 */
	public String getOrderToken() {

		return this.orderToken;
	}

	/**
	 * @param orderToken new value of {@link #getOrderToken}.
	 */
	public void setOrderToken(String orderToken) {

		this.orderToken = orderToken;
	}

	/**
	 * @param isArchive
	 */
	public boolean isArchive() {
		return archive;
	}
	
	/**
	 * @param archive new value archive
	 */
	public void setArchive(boolean archive) {
		this.archive = archive;
	}

	/**
	 * @param archive new value isOrder_cockpit
	 */
	public boolean isOrder_cockpit() {
		return order_cockpit;
	}

	/**
	 * @param isOrder_cockpit
	 */
	public void setOrder_cockpit(boolean order_cockpit) {
		this.order_cockpit = order_cockpit;
	}

	
}
