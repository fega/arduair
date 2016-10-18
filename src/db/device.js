var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//MODELO DE MONGOOSE
module.exports =mongoose.model('device',{
    name: String, //device name
    password: String, //device password
    description:String, //device description
    parameters:[String], //device parameters
    owner:String,  //device owner
    email:String, //owner email

    lastRegister: {type: Date, default: Date.now}, //last time of a measure was sended

    date:   [Date], //array with measure dates
    humidity:   [Number], //humidity in %
    temperature:[Number],//temperature in °C
    pressure:   [Number],//presure in ¿¿mb??
    Location:   [String],//location in geographic coordinates
    pst:    [Number], //pst in ug/m3
    pm10:   [Number], //P.M. 10 in ug/m3
    pm25:   [Number], //P.M. 2.5 in ug/m3
    so2:    [Number], //SO2
    no2:    [Number], //NO2
    o3:     [Number], //O3
    co:     [Number], //CO
    //ch4:    [Number], //CH (non criteria pollutant)
    //nh3:    [Number]  //NH3 (non criteria pollutant)
});


/*
//general Parameters:
0   [Date       ]
1   [humidity   ]
2   [temperature]
3   [pressure   ]
4   [Location   ]
//Criteria pollutants
5   [   PST     ]
6   [   PM10    ]
7   [   PM2.5   ]
8   [   SO2     ]
9   [   NO2     ]
10  [   O3      ]
11  [   CO      ]
//Non Criteria pollutants
12  [   CH4     ]
13  [   NH3     ]
14  [   CH4     ]
*/
