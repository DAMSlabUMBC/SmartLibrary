/*
Documentations
Ada_fruit_BME680: https://github.com/adafruit/Adafruit_BME680/tree/master. 
https://adafruit.github.io/Adafruit_BME680/html/class_adafruit___b_m_e680.html

AnalogInputs: https://randomnerdtutorials.com/esp32-adc-analog-read-arduino-ide/

*/

#include <WiFi.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include <Wire.h> //for I2C protocol
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>

#define SOUND_PIN 35
#define LIGHT_PIN 34
#define BME680_I2C_ADDR 0x76 //addr for sensor per 12C protocol
#define NUM_TASKS 5
#define PUBLISH_INTERVAL 5000

Adafruit_BME680 bme_sensor; //bme680 sensor object

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
  
  serial.begin();
  while (!Serial); // Wait for serial monitor to open

  // Initialize the BME680 sensor
  Serial.println("*********INITITLIAZING BME680 SENSOR*********")
  while (!bme_sensor.begin(BME680_I2C_ADDR)) {
    Serial.println("Error! BME680 sensor not detected");
  }
  // Configure bme sensor settings
  bme_sensor.setTemperatureOversampling(BME680_OS_8X); //8x oversampling rate
  bme_sensor.setHumidityOversampling(BME680_OS_2X);
  bme_sensor.setPressureOversampling(BME680_OS_4X);
  bme_sensor.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme_sensor.setGasHeater(320, 150); // 320°C for 150 ms

  //Once again the set up with DAMs mqtt broker hasn't been decided, this is just a placeholder
  // set the ADC attenuation to 11 dB (up to ~3.3V input)
  analogSetAttenuation(ADC_11db);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("ESP32 - Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  connectToMQTT();


  task_queue[0] = read_light_sensor;
  task_queue[1] = read_sound_sensor;
  task_queue[2] = read_bme_sensor;
  task_queue[3] = read_nova_sensor;
  task_queue[4] = publish_readings;


}

void loop() {
  // put your main code here, to run repeatedly:

  // after the specified time interval has elapsed an 
  // interrupt wakes up the esp32 which then runs the tasks in the task queue.
  // then esp32 goes to sleep for the specified time to conserve power

}



