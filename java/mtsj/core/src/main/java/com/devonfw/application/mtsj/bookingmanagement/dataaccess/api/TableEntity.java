package com.devonfw.application.mtsj.bookingmanagement.dataaccess.api;

import javax.persistence.Entity;

import com.devonfw.application.mtsj.bookingmanagement.common.api.Table;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

@Entity
@javax.persistence.Table(name = "\"Table\"")
public class TableEntity extends ApplicationPersistenceEntity implements Table {

  private Integer seatsNumber;

  private String deviceId;

  /**
   * @return deviceId
   */
  @Override
  public String getDeviceId() {

    return this.deviceId;
  }

  /**
   * @param deviceId new value of {@link #getdeviceId}.
   */
  @Override
  public void setDeviceId(String deviceId) {

    this.deviceId = deviceId;
  }

  private static final long serialVersionUID = 1L;

  /**
   * @return seatsNumber
   */
  @Override
  public Integer getSeatsNumber() {

    return this.seatsNumber;
  }

  /**
   * @param seatsNumber new value of {@link #getseatsNumber}.
   */
  @Override
  public void setSeatsNumber(Integer seatsNumber) {

    this.seatsNumber = seatsNumber;
  }

}
