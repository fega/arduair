#include <dht.h>

#define DHTPIN 7
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);
void setup() {
Serial.begin(9600);
dht.begin();
}
void loop() {  
int h = dht.readHumidity();// Lee la humedad
int t= dht.readTemperature();//Lee la temperatura
//////////////////////////////////////////////////Humedad
Serial.print("Humedad Relativa: ");                 
Serial.print(h);//Escribe la humedad
Serial.println(" %");                     
delay (2500);
///////////////////////////////////////////////////Temperatura              
Serial.print("Temperatura: ");                  
Serial.print(t);//Escribe la temperatura
Serial.println(" C'");                   
delay (2500);
}

