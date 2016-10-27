int incomingByte = 0;   // for incoming serial data

void setup() {
        Serial.begin(9600);     // opens serial port, sets data rate to 9600 bps
        Serial3.begin(9600);
        Serial.write("hello");
        delay(1000);
        Serial3.write(0xFF);
        Serial3.write(0x78);
        Serial3.write(0x03);
        Serial3.write(0x00);
        Serial3.write(0x00);
        Serial3.write(0x00);
        Serial3.write(0x00);
        Serial3.write(0x84);
}

void loop() {
        // send data only when you receive data:
        //Serial3.write(0x02);
        if (Serial3.available() > 0) {
                // read the incoming byte:
                incomingByte = Serial3.read();
                // say what you got:
                Serial.print("I received: ");
                Serial.println(incomingByte, HEX);
        }
}
