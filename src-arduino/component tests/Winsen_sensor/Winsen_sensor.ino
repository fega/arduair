int incomingByte = 0;   // for incoming serial data

void setup() {
        Serial.begin(9600);     // opens serial port, sets data rate to 9600 bps
        Serial2.begin(9600);
        Serial.write("hello");
        delay(1000);
        Serial2.write(0xFF);
        Serial2.write(0x01);
        Serial2.write(0x78);
        Serial2.write(0x03);
        Serial2.write(0x00);
        Serial2.write(0x00);
        Serial2.write(0x00);
        Serial2.write(0x00);
        Serial2.write(0x84);
}

//void loop() {
//        // send data only when you receive data:
//        //Serial2.write(0x02);
//        if (Serial2.available() > 0) {
//                // read the incoming byte:
//                incomingByte = Serial2.read();
//                // say what you got:
//                Serial.print("I received: ");
//                Serial.println(incomingByte, DEC);
//        }
//}

void loop() {
        // send data only when you receive data:
        //Serial2.write(0x02);
        if (Serial2.available() > 0) {
                byte measure[8];
                Serial2.readBytes(measure,9);
                incomingByte = Serial2.read();
                // say what you got:
                Serial.print(measure[0],HEX);
                Serial.print(" ");    
                Serial.print(measure[1],HEX);
                Serial.print(" ");
                Serial.print(measure[2],HEX);
                Serial.print(" ");
                Serial.print(measure[3],HEX);
                Serial.print(" ");
                Serial.print(measure[4],HEX);
                Serial.print(" ");
                Serial.print(measure[5],HEX);
                Serial.print(" ");
                Serial.print(measure[6],HEX);
                Serial.print(" ");
                Serial.print(measure[7],HEX);
                Serial.print(" ");
                Serial.print(measure[8],HEX);
                int ppm = measure[2]*256+measure[3];
                Serial.print("[C]: ");
                Serial.println(ppm);
                
        }
}
