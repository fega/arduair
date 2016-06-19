var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//MODELO DE MONGOOSE
module.exports =mongoose.model('device',{
    name: String,
    macAddress:String,
    password: String,
    description:String,
    parameters:[String],
    owner:String,
    email:String,

    lastRegister: {type: Date, default: Date.now},
    
    date:   [Date],
    humidity:   [Number],
    temperature:[Number],
    pressure:   [Number],
    Location:   [String],
    pst:    [Number],
    pm10:   [Number],
    pm25:   [Number],
    so2:    [Number],
    no2:    [Number],
    o3:     [Number],
    co:     [Number],
    ch4:    [Number],
    nh3:    [Number]
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