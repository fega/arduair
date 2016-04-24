#include <SPI.h>
#include <SD.h>

File myFile;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sdBegin();
  tableCreate();
}

void loop() {
  // put your main code here, to run repeatedly:
 tableWrite();
 Serial.println("one line should be created");
 delay(10000);
}


void sdBegin(){
  if (!SD.begin(8)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");
}


void tableWrite(){
  
  myFile = SD.open("DATA.txt", FILE_WRITE); //abrir la SD
  if (myFile){
    int h = 15;
    myFile.print(h);
    myFile.print(",");
    
    int t= 20;
    myFile.print(t);
    myFile.print(",");
    
    float p= 25;
    myFile.print(p);
    myFile.print(",");
    
    float co=30;
    myFile.print(co);
    myFile.print(",");
    
    //enviar a la tabla
    myFile.println(" ");
    myFile.close();
  }
}
void tableCreate(){
    if (SD.exists("example.txt")) {
    Serial.println("example.txt exists.");
  }
  else {
    Serial.println("example.txt doesn't exisT, creating...");
    myFile = SD.open("DATA.txt", FILE_WRITE);
    myFile.close();
  }
}

