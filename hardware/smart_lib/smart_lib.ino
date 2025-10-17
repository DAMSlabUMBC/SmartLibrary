/*
Documentations
Ada_fruit_BME680: https://github.com/adafruit/Adafruit_BME680/tree/master. 
https://adafruit.github.io/Adafruit_BME680/html/class_adafruit___b_m_e680.html

AnalogInputs: https://randomnerdtutorials.com/esp32-adc-analog-read-arduino-ide/

Light Sleep for ESP32: https://randomnerdtutorials.com/esp32-light-sleep-arduino/
*/

#include <WiFi.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include <Wire.h> //for I2C protocol
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>
#include "esp_sleep.h"

#define SOUND_PIN 35
#define LIGHT_PIN 34
#define BME680_I2C_ADDR 0x76 //addr for sensor per 12C protocol
#define NUM_TASKS 5

// Adafruit_BME680 bme_sensor; //bme680 sensor object
/***********************************************************
//The mqtt section below is a template I copied. Our setup with the DAMs Lab mqtt broker hasn't being decided
//probably not going to use wifi to connect to the broker
const char WIFI_SSID[] = "YOUR_WIFI_SSID";
const char WIFI_PASSWORD[] = "YOUR_WIFI_PASSWORD";

const char MQTT_BROKER_ADRRESS[] = "test.mosquitto.org";  // CHANGE TO MQTT BROKER'S ADDRESS
const int MQTT_PORT = 1883;
const char MQTT_CLIENT_ID[] = "YOUR-NAME-esp32-001";
const char MQTT_USERNAME[] = "";
const char MQTT_PASSWORD[] = "";

// The MQTT topics that ESP32 should publish/subscribe
const char PUBLISH_TOPIC[] = "YOUR-NAME-esp32-001/loopback";    // CHANGE IT AS YOU DESIRE
const char SUBSCRIBE_TOPIC[] = "YOUR-NAME-esp32-001/loopback";  // CHANGE IT AS YOU DESIRE

const int PUBLISH_INTERVAL = 5000; //placeholder

WiFiClient network;
MQTTClient mqtt = MQTTClient(256);

unsigned long lastPublishTime = 0;
************************************************************/
typedef struct{
  int temp = 0;
  int humidity = 0;
  int pressure = 0;
} bme_reading_t;

int light_reading = 0;
int sound_reading = 0;
bme_reading_t bme_readings;
uint64_t sleep_time = 5000000; //5 sec


void (*task_queue[NUM_TASKS])(); //array of function pointers. each function is a task to be performed

/**
* 
*/
void read_light_sensor();

/**
* 
*/
void read_sound_sensor();

/**
* 
*/
void read_bme_sensor();

/**
* 
*/
void read_nova_sensor();

/**
*
*/
void publish_readings();

void setup() {
  
  Serial.begin(9600);
  // while (!Serial); // Wait for serial monitor to open

  // // Initialize the BME680 sensor
  // Serial.println("*********INITITLIAZING BME680 SENSOR*********")
  // while (!bme_sensor.begin(BME680_I2C_ADDR)) {
  //   Serial.println("Error! BME680 sensor not detected");
  // }
  // // Configure bme sensor settings
  // bme_sensor.setTemperatureOversampling(BME680_OS_8X); //8x oversampling rate
  // bme_sensor.setHumidityOversampling(BME680_OS_2X);
  // bme_sensor.setPressureOversampling(BME680_OS_4X);
  // bme_sensor.setIIRFilterSize(BME680_FILTER_SIZE_3);
  // bme_sensor.setGasHeater(320, 150); // 320°C for 150 ms

  //Once again the set up with DAMs mqtt broker hasn't been decided, this is just a placeholder
  // set the ADC attenuation to 11 dB (up to ~3.3V input)
  // analogSetAttenuation(ADC_11db);

  // WiFi.mode(WIFI_STA);
  // WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  // Serial.println("ESP32 - Connecting to Wi-Fi");

  // while (WiFi.status() != WL_CONNECTED) {
  //   delay(500);
  //   Serial.print(".");
  // }
  // Serial.println();

  // connectToMQTT();


  task_queue[0] = read_light_sensor;
  task_queue[1] = read_sound_sensor;
  task_queue[2] = read_bme_sensor;
  task_queue[3] = read_nova_sensor;
  task_queue[4] = publish_readings;

  // Enable wake-up by timer
  esp_err_t result = esp_sleep_enable_timer_wakeup(sleep_time);
  if (result == ESP_OK) {
    Serial.println("Timer Wake-Up set successfully as wake-up source.\n");
  } else {
    Serial.println("Failed to set Timer Wake-Up as wake-up source.\n");
  }
}

void loop() {
  // after the specified time interval has elapsed an 
  // interrupt wakes up the esp32 which then runs the tasks in the task queue.
  // then esp32 goes to sleep for the specified time to conserve power.
  // NOTE: bme680 sensor should go into sleep mode as well for conserving power

  for (int i = 0; i < NUM_TASKS; i++) {
    (*task_queue[i])(); //calls the function at the specified index
  }

  // Serial.println("*******Entering Light Sleep Mode");
  delay(5000);
  // esp_light_sleep_start();     
}

void read_light_sensor() {
  /*
  Esp32 has an analog resolution of 12 bits so it can detect up to 4096 analog levels.
  So analog read will return a value between 0 and 4095 which corresponds to 0V to 3.3V
  */
  // Serial.println("*********Reading Light Sensor************\n");
  // int temp = analogRead(LIGHT_PIN); //returns a value between 0-4095
  // Serial.print("light is \n");
  // Serial.print(temp);


  //need to figure out conversion calculations

}

void read_sound_sensor() {
  /*
  Esp32 has an analog resolution of 12 bits so it can detect up to 4096 analog levels.
  So analog read will return a value between 0 and 4095 which corresponds to 0V to 3.3V
  */
  Serial.println("*********Reading Sound Sensor************\n");
  int temp = analogRead(SOUND_PIN); //returns a value between 0-4095
  Serial.print("Sound is: ");
  Serial.print(temp);
  Serial.print("\n");




  //need to figure out conversion calculations
}

void read_bme_sensor() {

}

void read_nova_sensor() {

}

void publish_readings() {

}
