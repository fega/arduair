#include <SPI.h>       //Serial communication (with the SD card)
#include <SD.h>        //SD card Library
#define SDPIN 10
File myFile;
void setup() {
  sdBegin(); 
  tableWrite();  
}

void loop() {
  
}
void tableWrite(){
  //write data in SD
  digitalWrite(SDPIN,LOW); //active SD

  myFile = SD.open("CONFIG.txt", FILE_WRITE); //open SD data.txt file

  if (myFile){
    myFile.println("[network=FABIAN]");
    myFile.println("[networkpass=63856199]");
    myFile.println("[server=arduair.herokuapp.com]");
    myFile.println("[device=demotest1]");
    myFile.println("");
    myFile.println("[password=demodemo]");
    myFile.println("[wifi=true]");
    myFile.println("");
    myFile.println("[resetclock=false]");
    myFile.println("[year=1]");
    myFile.println("[month=1]");
    myFile.println("[day=1]");
    myFile.println("[hour=1]");
    myFile.println("[minute=1]");
    myFile.println("[second=1]");
    myFile.println("");
    
    myFile.close();
  }
}
void sdBegin(){
  if (!SD.begin(4)) {
    return;
  }
}


