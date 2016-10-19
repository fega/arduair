var Device = require('./device');

module.exports = function(req, res, next) {
    var dataDate;
    if (req.isServerTime) {
        dataDate = new Date();
        console.log("using internal date" + dataDate);
    } else {
        dataDate = new Date(req.params.year, req.params.month, req.params.day, req.params.hours, req.params.minutes, 0, 0);
        console.log("using provided date" + dataDate);
    }

    var query = {
        name: req.params.device,
        password: req.params.password
    }; //search a device/password combination
    var store = { //get the variables
        $push: {
            date: dataDate,
            humidity: req.query.h || null,
            temperature: req.query.t || null,
            pressure: req.query.p || null,
            Location: req.query.l || null,
            pst: req.query.pst || null,
            pm10: req.query.pm10 || null,
            pm25: req.query.pm25 || null,
            so2: req.query.so || null,
            no2: req.query.no || null,
            o3: req.query.o3 || null,
            co: req.query.co || null,
            ch4: req.query.ch4 || null,
            nh3: req.query.nh3 || null,
            vocs: req.query.voc || null
        }
    };
    Device.update(query, store, (err, data)=> {
        console.log(data);
        if (err) {
            console.log('Handled error: ' + err);
            req.result = {
                status: "error",
                message: "Search error, please try again"
            };
            res.send("fail");
        } else {
            if (data.n === 0) {
                console.log('Device not found');
                req.result = "device not Found";
            } else {
                console.log('Device found and updated');
                req.result = "OK";
                req.data = data;
            }
            return next();
        }
    });
};

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
testURL:
http://localhost:4000/api/demotest1/demodemo?date=hola&co=10&h=10&t=10&p=10&l=10&pst=10&so=10
*/
