//Android fake and "Cutre" Material Design
//this project was started to provide a seemly looking GUI to my tesis
//it's very simple but works to make the things quick

import java.util.stream.*;
import java.util.*;
//about the resolution: 
//px = dp * (dpi / 160) samsumg core2 duo has 217 dpi *(217/160)
int dpi=217;
//theme Color
String main="#FFEB3B";
String accent="#F44336";
boolean bg=true;
Table data;//table con los diferentes datos
  
//GUI section
theme t = new theme(main,accent,bg);
ArrayList<GUI> GUIS= new ArrayList<GUI>();
toolBar s =new toolBar();
btnCircle btab1,btab3;     //circle buton tab 1, and circle button tab 2
tabBar tb;
graph g;

//install the font  
PFont Roboto;//roboto font, of materialdesign guidelines
PShape addIcon,menuIcon,closeIcon,refreshIcon;
PShape bluCon,bluDis,bluSearch;
//////////////////////////////////////////////////////////SETUP
void setup(){
  size(480,600); //resolution based on Samsung Galaxy Ace 4 Neo Duos 
  t.mainHue1=color(#FDD835);
  Roboto = createFont("Roboto-Regular.ttf", 21*217/160);//adding roboto font
  
  //adding PShapes of materialize
  addIcon=loadShape("addIcon.svg");
  addIcon.disableStyle();
  menuIcon=loadShape("menuIcon.svg");
  menuIcon.disableStyle();
  closeIcon=loadShape("closeIcon.svg");
  closeIcon.disableStyle();
  
  //adding PShapes of bluetooth state
  bluCon=loadShape("bluConect.svg");
  bluCon.disableStyle();
  bluDis=loadShape("bluDiscon.svg");
  bluDis.disableStyle();
  bluSearch=loadShape("bluSearch.svg");
  bluSearch.disableStyle();
  
  //set the table with data
  data =loadTable("testData.csv");
  
  //set the GUI
  tb=      new tabBar("main","edit","results");
  btab1 =  new btnCircle(width-50,height-50,"+");
  btab3 =  new btnCircle(width-50,height-50,"PEN",#43A047);
  
  g=     new graph();
  g.importTable();
}
//////////////////////////////////////////////////////////DRAW FUNCTION
void draw(){
  background(#FAFAFA);
  
  if (tb.btn1.state == 1){
    tb.displayTab1();
    btab1.deactivate=false;
    btab1.display();
  }
  if (tb.btn2.state == 1){
    tb.displayTab2();
    btab1.deactivate=true;
  }
  if (tb.btn3.state == 1){
    tb.displayTab3();
    btab1.deactivate=true;
    btab3.display();
  }
  s.display();
  tb.display();
}
//////////////////////////////////////////////////////////CLASSES
// class GUI: de donde de se extienden las demas GUI class
class GUI{
  GUI(){  }
  void display(){}
}
// class ToolBar: toolBar como la de material Design
class toolBar extends GUI{
  color c;
  int toolWidth;//should be android device Weight
  int toolHeight;//should be 56dpi
  int leftIcon; //could be the menu icon or backArrow icon
  int rightIcon;//could be searchIcon, noone..no more for now.
  int Zdepth;///Zdepth of the toolBar
  int statusHeight;
  btnTile btnMenu=new btnTile("MENU",0,statusHeight,toolHeight,toolHeight,0);
  toolBar(){
    
    //set the parameters
    c=t.mainColor;
    leftIcon=1;
    rightIcon=0;
    Zdepth=1;
    toolHeight=56*dpi/160;
    statusHeight=26*dpi/160;
    
    //set button menu parameters
    btnMenu.x=0;
    btnMenu.y=statusHeight;
    btnMenu.w=toolHeight;
    btnMenu.h=toolHeight;
    
  }
  void display(){
    //maintoobar
    fill(0);
    rect(0,0,width,statusHeight);
    
    fill(t.mainColor);
    stroke(0,0);
    rect(0,statusHeight,width,toolHeight);
    
    //app name
    fill(t.mainTextColor);
    textAlign(LEFT,CENTER);
    textFont(Roboto);
    text("ArduAir Project",72*dpi/160,toolHeight/2+statusHeight);
    
    //shadow
    fill(0,20);
    rect(0,statusHeight+toolHeight,width,2);
    fill(0,10);
    rect(0,statusHeight+toolHeight+2,width,1);
    fill(0,5);
    rect(0,statusHeight+toolHeight+3,width,1);
    
    //show menu button
    btnMenu.display();
  }
}
//Class theme: crea un set de colores para todo el tema de material Design
class theme{
  color mainColor;//mainColor like https://www.google.com/design/spec/style/color.html#color-ui-color-application
  color mainHue1,mainHue2;
 
  int accentColor, accentHue1, accentHue2;//accentColor
  
  color bgColor;//backgroundColor
  color mainTextColor;
  color secondTextColor;
  
  theme(String _mainColor, String _accentColor, boolean _bgColor){
    _mainColor = "FF" + _mainColor.substring(1);//convert String to color
    mainColor= unhex(_mainColor);
    
    _accentColor = "FF" + _accentColor.substring(1);//convert to color the accent color
    accentColor= unhex(_accentColor);
    
    if (_bgColor)
    { mainTextColor=color(0,138); } //set the font color as black
    else {mainTextColor=color(255);}//set the font color as black
  }
}
//Class BtnCircle: boton circular del thema.
class btnCircle extends GUI{//round shaped button
  color c;
  boolean deactivate;
  String icon;
  int x, y, size, rSize;
  
  btnCircle(int _x, int _y,String _icon){
    c=t.accentColor;
    deactivate=false;
    icon=_icon;
    x=_x; y=_y;
    size=56*217/160;
  }
  btnCircle(int _x, int _y,String _icon,color _c){
    c=_c;
    deactivate=false;
    icon=_icon;
    x=_x;  y=_y;
    size=56*217/160;
  }
    void display(){
    ellipseMode(CENTER);
    stroke(0,0);
    //shadow
    fill(0,40);
    ellipse(x+1,y+1,size+2,size+2);
    ellipse(x+1,y+1,size+4,size+4);
    fill(0,20);
    ellipse(x+1,y+1,size+6,size+6);
    fill(0,10);
    ellipse(x+1,y+1,size+9,size+9);
    
    //button
    fill(c);
    ellipse(x,y,size,size); 
    
    //texto del centro
    fill(color(255));
    shapeMode(CENTER);
    shape(addIcon,x,y,size/2,size/2);
  }
  void in(){
    
  }
  void out(){
    
  }
  boolean hover(){
    return true;
  }
}
//Clase TabBar de donde, barra de pestañas
class tabBar extends GUI{
 String tab1,tab2,tab3;//the button strings
 int tabNum;//number of tabs
 int actTab;//active Tab
 int tabHeight=48*dpi/160;
 int tabIniHeight=s.statusHeight+s.toolHeight;
 
 //create buttons
 btnTile btn1= new btnTile("deft",0,tabIniHeight,width/3,tabHeight,1);
 btnTile btn2= new btnTile("deft",width/3,tabIniHeight,width/3,tabHeight,0);
 btnTile btn3= new btnTile("deft",width*2/3,tabIniHeight,width/3,tabHeight,0);
 
  tabBar(String _1,String _2,String _3){
    tab1= _1; btn1.text=tab1;
    tab2= _2; btn2.text=tab2;
    tab3= _3; btn3.text=tab3;
    actTab=1;
  }
  void display(){
    //dibujo de la tabBar
    fill(t.mainColor);
    rect(0,tabIniHeight,width,tabHeight);
    
    //buttons displays
    btn1.display();
    btn2.display();
    btn3.display();
    
    //buttons checks
      if (mousePressed){
        if (!btn1.hover()){
          btn1.state=1;
          btn2.state=0;
          btn3.state=0;
        }
        if (!btn2.hover()){
          btn1.state=0;
          btn2.state=1;
          btn3.state=0;
        }
         if (!btn3.hover()){
          btn1.state=0;
          btn2.state=0;
          btn3.state=1;
        }
      }
      //shadow
          //shadow
    fill(0,20);
    rect(0,tabHeight+tabIniHeight,width,2);
    fill(0,10);
    rect(0,tabHeight+tabIniHeight+2,width,1);
    fill(0,5);
    rect(0,tabHeight+tabIniHeight+3,width,1);
  }
  
  void displayTab1(){//funciones de la  TAB1
    fill(100);
    textAlign(CENTER,CENTER);
    textSize(16*217/160);
    text("No se han encontrado\ndispositivos cerca.\nPresione '+' para buscar.",width/2,height/2);
    shapeMode(CENTER);
    fill(200,0,0);
    shape(bluDis,width/2,height/2+120,50,50);
  }
  void displayTab2(){
  }
  void displayTab3(){
    g.display();
  }
}
//botones de tile: son los bogtones planos de bordes rectos, normalmente casi invisibles, como los de la TabBar

class btnTile extends GUI{
  String text;int c;//button text and color
  int h, w, x, y;//height,width, x and y position
  int state=0;
  
  btnTile(String _t,int  _x, int _y, int _w, int _h, int _s){
    text=_t;
    h=_h;  w=_w;
    x=_x;  y=_y;
    c=t.mainColor;
    state=_s;
  }
 void display(){
   //rectangle
   if (hover()){fill(c);}else {fill(t.mainHue1);}
   stroke(0,0);
   rect(x,y,w,h);
   //text
   if (setIcon()){
     whatIcon();
   }
   else{
     textSize(14*dpi/160);
     fill(t.mainTextColor); 
     textAlign(CENTER,CENTER);
     text(text,x+w/2,y+h/2);
   }
   
   if (state==1){
     fill(t.accentColor);
     rect(x,y+h,w,-2*dpi/160);     
   }
 }
   boolean hover()  {
    if (mouseX >= x && mouseX <= x+w && 
        mouseY >= y && mouseY <= y+w) {
      return false;
    } else {
      return true;
    }
  }
  boolean setIcon(){
    if (text=="MENU" || text=="CLOSE" || text=="ADD"){
    return true;}
    else {return false;}
  }
  void whatIcon(){ //select and displays the correct Icon
     
    if (text=="MENU")  {
      shapeMode(CENTER);
      fill(t.mainTextColor);
      shape(menuIcon,x+w/2,y+h/2,h*0.5,h*0.5);
    }
    if (text=="CLOSE") {shape(closeIcon,x+w/2,y+h/2,h*0.5,h*0.5);}
    if (text=="ADD")   {shape(addIcon,x+w/2,y+h/2,h*0.5,h*0.5);}
    
  }
}
// graph Class: esta clase dibuja el grafico en la pantalla
class graph extends GUI{

  String xLabel, yLabel;
  int x,y,w,h;
  float xMax, xMin, yMax, yMin;
  
  ArrayList<LineGraph> lines = new ArrayList<LineGraph>();
  Table table; 
  ArrayList<String> availables = new ArrayList<String>();

  graph(){
    x=16 *dpi/160;
    y=150*dpi/160;
    w=width-16*dpi/160-x;
    h=height-80*dpi/160-y;
    table=loadTable("testData.csv","header");
  }
  
  void display(){
    fill(0,0);
    stroke(0);
    rect(x,y,w,h);    
  }
  //importa el indexFile hacia el programa, 
  //define cuales son los parametros medidos dentro del archivo.
  //Y crea los diferentes "lineGraph" con los datos listos para mostrarlos si es necesario
  void importTable(){  
    availables.clear();// son los contaminantes y parametros medidos en la  tabla
    table.clearRows();//limpiamos la tabla, para leer mi nuevo archivo
    table=loadTable("testData.csv","header");//leemos el nuevo archivo, que por ahora es testData
    
    println("Colums in Table after:"+table.getColumnCount());
    println("Rows in Table after:"+table.getRowCount());
    
    int noValues= data.getRowCount();//obtenemos el numero de valores, para iterar
    //a Set of availables labels (or contaminants)
    // el proposito de este SET es eliminar rapidamente los valores repetidos para usarlos posteriormente, para elegir los contaminantes a mostrar
    Set<String> availablesSet = new HashSet<String>();
    
    //envio los valores de la tabla hacia el set
    for(int i=0;i<noValues-1;i++){
      String s = table.getString(i, 9);
      availablesSet.add(s);
    }
    //treaspasing items to the arraylist
    //esta accion elimina los duplicados
    availables.clear();
    availables.addAll(availablesSet);
    
    //imprimo en consola para ver los resultados
    for (String temp: availables){
      println(temp);
    }
    for(int i=0;i<availables.size();i++)
    {
      lines.add(new LineGraph());
  }
}
class LineGraph{
  String name;
  Array data[][];
  lineGraph(String _name){
    name=_name;
  }
  //este metodo busca en el archivo index previamente cargado, para generar los valores de los lineGraph
  void updateData(){
    
  }
  //este metodo cuenta el numero de entradas en el archivoIndex, cuantas veces
  int countString(){
    
  }
}