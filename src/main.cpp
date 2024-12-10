#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <WiFi.h>
#include <string>
#include <ArduinoHttpClient.h>
#include "secret.h"
#define DHTPIN 4    
#define DHTTYPE DHT11     


DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS = 5000; 
float temperature = 0.0;
float humidity = 0.0;


char serverAddress[] = "192.168.0.70"; 
int port = 5000;

WiFiClient wifiClient;
HttpClient httpClient(wifiClient, serverAddress, port);

void ConnectToWifi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(wifiName, wifiPassword);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void SetupSensor() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("Temperature and Humidity Sensor initialized.");
}

void ReadTemperatureAndHumidity() {
  sensors_event_t event;

  dht.temperature().getEvent(&event);
  if (!isnan(event.temperature)) {
    temperature = event.temperature;
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
  } else {
    Serial.println("Error reading temperature!");
  }

  dht.humidity().getEvent(&event);
  if (!isnan(event.relative_humidity)) {
    humidity = event.relative_humidity;
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
  } else {
    Serial.println("Error reading humidity!");
  }
}

String CreateJsonPayload() {
  String jsonPayload = "{";
  jsonPayload += "\"temperature\": " + String(temperature) + ",";
  jsonPayload += "\"humidity\": " + String(humidity);
  jsonPayload += "}";
  return jsonPayload;
}

void SendTemperatureAndHumidity() {
  String payload = CreateJsonPayload();

  Serial.println("Sending data to server:");
  Serial.println(payload);

  httpClient.beginRequest();
  httpClient.post("/send_temperature");  
  httpClient.sendHeader("Content-Type", "application/json");
  httpClient.sendHeader("Content-Length", payload.length()); 
  httpClient.beginBody();
  httpClient.print(payload);  

  Serial.println("Waiting for response...");

  int statusCode = httpClient.responseStatusCode();
  String response = httpClient.responseBody();

  Serial.print("Response Code: ");
  Serial.println(statusCode);
  Serial.print("Response Body: ");
  Serial.println(response);
}

void setup() {
  SetupSensor();
  ConnectToWifi();
}

void loop() {
  ReadTemperatureAndHumidity();
  SendTemperatureAndHumidity();
  delay(delayMS);
}
