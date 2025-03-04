package com.devonfw.application.mtsj.predictionmanagement.logic.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.test.context.support.ReactorContextTestExecutionListener;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.repo.DishRepository;
import com.devonfw.application.mtsj.general.common.api.constants.Roles;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionForecastDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionModelDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.repo.PredictionDayDataRepository;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.repo.PredictionModelDataRepository;
import com.devonfw.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;
import com.devonfw.module.test.common.base.ComponentTest;

/**
 * Test for {@link Predictionmanagement}
 *
 */
// @SpringBootTest(classes = { SpringBootApp.class, PredictionmanagementTest.TestConfig.class })
@Profile("hana")

@TestExecutionListeners(listeners = { WithSecurityContextTestExecutionListener.class,
ReactorContextTestExecutionListener.class })

@SpringBootTest(classes = SpringBootApp.class)
// @RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
public class PredictionmanagementTest extends ComponentTest {

  @InjectMocks
  private Predictionmanagement predictionManagement = new PredictionmanagementImpl();

  @Mock
  private PredictionDayDataRepository predictionDayDataRepository;

  @Mock
  private PredictionModelDataRepository predictionModelDataRepository;

  @Mock
  private EntityManager entityManager;

  @Mock
  private PredictionForecastDataEntity forecastData;

  @Mock
  private PredictionDayDataEntity predictionDayDataEntity;

  @Mock
  private PredictionModelDataEntity entity;

  @Mock
  private DishRepository dishRepository;

  @Mock
  private Query mockedQuery;

  static PredictionDayDataEntity predictionDayData;

  /**
   * Creation of needed objects
   */
  @Override
  public void doSetUp() {

    predictionDayData = new PredictionDayDataEntity();
    predictionDayData.setDishName("Dish 1");
    predictionDayData.setForecast(Double.valueOf(0.8));
    predictionDayData.setId(Long.valueOf(1));
    predictionDayData.setModificationCounter(0);
    predictionDayData.setTimestamp(Integer.valueOf(5));
  }

  /**
   * Tests the prediction
   */
  @Test
  @WithMockUser(username = "manager", authorities = { Roles.MANAGER })
  public void getNextWeekPrediction() {

    // Class<?> type = Mockito.any();
    // List<String> holidays = new ArrayList<>();
    // holidays.add("0");

    // List<Double> temperatures = new ArrayList<>();
    // temperatures.add(Double.valueOf(20.5d));
    // PredictionSearchCriteriaTo eto = new PredictionSearchCriteriaTo();
    // eto.setHolidays(holidays);
    // eto.setTemperatures(temperatures);
    // eto.setType(Type.PREDICTION);
    // eto.setStartBookingdate(new Timestamp(System.currentTimeMillis()));
    // PageRequest pageable = PageRequest.of(0, 100);
    // eto.setPageable(pageable);

    // PredictionDayDataRepository predictionDayDataRepository = mock(PredictionDayDataRepository.class);
    // PredictionModelDataRepository predictionModelDataRepository = mock(PredictionModelDataRepository.class);
    // EntityManager entityManager = mock(EntityManager.class);
    // PredictionForecastDataEntity forecastData = mock(PredictionForecastDataEntity.class);
    // PredictionDayDataEntity predictionDayDataEntity = mock(PredictionDayDataEntity.class);
    // PredictionModelDataEntity entity = mock(PredictionModelDataEntity.class);

    // doNothing().when(this.predictionDayDataRepository).deletePredictionForecastData();
    // when(this.dishRepository.findAll()).thenReturn(returnDishes());
    // doNothing().when(this.entityManager).persist(this.forecastData);
    // Page<PredictionDayDataEntity> predictionDayDataPage = mock(Page.class);
    // when(this.predictionDayDataRepository.getPrediction(eto)).thenReturn(returnPagePredictionDayData());
    // generatePredictionFor
    // doNothing().when(this.predictionModelDataRepository).deleteTmpPredictionModel();
    // doNothing().when(this.predictionModelDataRepository).prepareModelPredictions(1l);
    // doNothing().when(this.predictionDayDataRepository).deleteTmpPredictionForecast();

    // Query mockedQuery = mock(Query.class);
    // when(this.entityManager.createNativeQuery(any())).thenReturn(this.mockedQuery);
    // when(this.mockedQuery.executeUpdate()).thenReturn(1);
    // doNothing().when(this.predictionDayDataRepository).deletePredictionDayDatabyDish(1l);
    // doNothing().when(this.predictionDayDataRepository).savePredictions(1l);
    // train

    // when(this.predictionModelDataRepository.isTrainingNecessary(new Long(1), "date")).thenReturn(1);
    // when(this.predictionModelDataRepository.isTrainingPossible()).thenReturn(1);
    // doNothing().when(this.predictionModelDataRepository).deleteTmpPredictionData();
    // doNothing().when(this.predictionModelDataRepository).prepareTrainingData(new Long(1),
    // new Timestamp(System.currentTimeMillis()));
    // doNothing().when(this.predictionModelDataRepository).deleteTmpPredictionModel();
    // doNothing().when(this.predictionModelDataRepository).deleteTmpPredictionFit();

    // Query mockedQuery1 = mock(Query.class);
    // when(this.entityManager.createNativeQuery("dummy").executeUpdate()).thenReturn(1);
    // doNothing().when(this.predictionModelDataRepository).deletePreditionDataModelbyDishId(1l);
    // when(this.predictionModelDataRepository.save(this.entity)).thenReturn(this.entity);
    // doNothing().when(this.predictionModelDataRepository).addPredictionModel(1l);

    // PredictionDataTo nextWeekPrediction = this.predictionManagement.getNextWeekPrediction(eto);
    // assertThat(nextWeekPrediction).isNotNull();
    // assertThat(nextWeekPrediction.getData()).isNotNull();
    // assertThat(nextWeekPrediction.getData().size()).isEqualTo(1);

    // PredictionDayDataEto expected = new PredictionDayDataEto();
    // expected.setDishName(predictionDayData.getDishName());
    // expected.setForecast(predictionDayData.getForecast());
    // expected.setId(predictionDayData.getId());
    // expected.setModificationCounter(predictionDayData.getModificationCounter());
    // expected.setTimestamp(predictionDayData.getTimestamp());
    // assertThat(nextWeekPrediction.getData().get(0)).isEqualToComparingFieldByField(expected);
  }

  private List<DishEntity> returnDishes() {

    List<DishEntity> dishEntities = new ArrayList<DishEntity>();
    DishEntity dishEntity = new DishEntity();
    dishEntity.setId(123l);
    dishEntity.setName("test");
    dishEntity.setPrice(new BigDecimal(12));
    dishEntities.add(dishEntity);

    return dishEntities;
  }

  private Page<PredictionDayDataEntity> returnPagePredictionDayData() {

    Page<PredictionDayDataEntity> predictionDayDataPage = null;
    List<PredictionDayDataEntity> predictionDayDataList = new ArrayList<PredictionDayDataEntity>();
    PredictionDayDataEntity predictionDayDataEntity = new PredictionDayDataEntity();
    predictionDayDataEntity.setId(Long.valueOf(1));
    predictionDayDataEntity.setTimestamp(Integer.valueOf(5));
    predictionDayDataEntity.setForecast(Double.valueOf(0.8));
    predictionDayDataEntity.setDishName("Dish 1");
    predictionDayDataEntity.setModificationCounter(0);
    predictionDayDataList.add(predictionDayDataEntity);

    predictionDayDataPage = new PageImpl<PredictionDayDataEntity>(predictionDayDataList);
    return predictionDayDataPage;
  }

}
