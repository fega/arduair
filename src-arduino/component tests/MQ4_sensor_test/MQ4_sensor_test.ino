/* 
 *  MQ-4 Methane Sensor Circuit with Arduino
 *  http://www.learningaboutelectronics.com/Articles/MQ-4-methane-sensor-circuit-with-arduino.php
 */

const int AOUTpin=0;//the AOUT pin of the methane sensor goes into analog pin A0 of the arduino
const int DOUTpin=8;//the DOUT pin of the methane sensor goes into digital pin D8 of the arduino
const int ledPin=13;//the anode of the LED connects to digital pin D13 of the arduino

int limit;
int value;

void setup() {
Serial.begin(115200);//sets the baud rate
pinMode(DOUTpin, INPUT);//sets the pin as an input to the arduino
pinMode(ledPin, OUTPUT);//sets the pin as an output of the arduino
}

void loop()
{
value= analogRead(AOUTpin);//reads the analaog value from the methane sensor's AOUT pin
limit= digitalRead(DOUTpin);//reads the digital value from the methane sensor's DOUT pin
Serial.print("Methane value: ");
Serial.println(value);//prints the methane value
Serial.print("Limit: ");
Serial.print(limit);//prints the limit reached as either LOW or HIGH (above or underneath)
delay(100);
if (limit == HIGH){
digitalWrite(ledPin, HIGH);//if limit has been reached, LED turns on as status indicator
}
else{
digitalWrite(ledPin, LOW);//if threshold not reached, LED remains off
}
}
