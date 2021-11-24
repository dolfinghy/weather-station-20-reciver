input.onButtonPressed(Button.A, function () {
    if (Write_Data == 0) {
        Write_Data = 1
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
    } else if (Write_Data == 1) {
        Write_Data = 0
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "time") {
        Sensor_Data.insertAt(0, value)
        deleted_item = Sensor_Data.removeAt(1)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
    } else if (name == "tempC") {
        Rx_Data_Check.insertAt(0, 1)
        deleted_item = Sensor_Data.removeAt(1)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(1, 1)
        deleted_item = Rx_Data_Check.removeAt(2)
    } else if (name == "humidity") {
        Sensor_Data.insertAt(2, value)
        deleted_item = Sensor_Data.removeAt(3)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(2, 1)
        deleted_item = Rx_Data_Check.removeAt(3)
    } else if (name == "pressure") {
        Sensor_Data.insertAt(3, value)
        deleted_item = Sensor_Data.removeAt(4)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(3, 1)
        deleted_item = Rx_Data_Check.removeAt(4)
    } else if (name == "altitude") {
        Sensor_Data.insertAt(4, value)
        deleted_item = Sensor_Data.removeAt(5)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(4, 1)
        deleted_item = Rx_Data_Check.removeAt(5)
    } else if (name == "rain") {
        Sensor_Data.insertAt(5, value)
        deleted_item = Sensor_Data.removeAt(6)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(5, 1)
        deleted_item = Rx_Data_Check.removeAt(6)
    } else if (name == "wind spe") {
        Sensor_Data.insertAt(6, value)
        deleted_item = Sensor_Data.removeAt(7)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(6, 1)
        deleted_item = Rx_Data_Check.removeAt(7)
    } else if (name == "wind dir") {
        Sensor_Data.insertAt(7, value)
        deleted_item = Sensor_Data.removeAt(8)
        if (Debug == 1) {
            serial.writeString(name)
            serial.writeString(":")
            if (value == 1) {
                serial.writeString("N")
            } else if (value == 2) {
                serial.writeString("NE")
            } else if (value == 3) {
                serial.writeString("E")
            } else if (value == 4) {
                serial.writeString("SE")
            } else if (value == 5) {
                serial.writeString("S")
            } else if (value == 6) {
                serial.writeString("SW")
            } else if (value == 7) {
                serial.writeString("W")
            } else if (value == 8) {
                serial.writeString("NW")
            } else {
                serial.writeString("???")
            }
            serial.writeLine(" ")
        }
        Rx_Data_Check.insertAt(7, 1)
        deleted_item = Rx_Data_Check.removeAt(8)
    } else if (name == "soilMstr") {
        Sensor_Data.insertAt(8, value)
        deleted_item = Sensor_Data.removeAt(9)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(8, 1)
        deleted_item = Rx_Data_Check.removeAt(9)
    } else if (name == "soilTmpC") {
        Sensor_Data.insertAt(9, value)
        deleted_item = Sensor_Data.removeAt(10)
        if (Debug == 1) {
            serial.writeValue(name, value)
        }
        Rx_Data_Check.insertAt(9, 1)
        deleted_item = Rx_Data_Check.removeAt(10)
        for (let index = 0; index <= Rx_Data_Check.length - 1; index++) {
            Total_Rx_Data = Total_Rx_Data + Rx_Data_Check[index]
            if (Debug == 1) {
                serial.writeString("Rx_Data_Chech[], Idex - ")
                serial.writeString("" + (index))
                serial.writeLine(" ")
                serial.writeString("Total Received Data - ")
                serial.writeNumber(Total_Rx_Data)
                serial.writeLine(" ")
            }
        }
        if (Total_Rx_Data == 10) {
            if (Debug == 1) {
                if (Write_Data == 1) {
                    serial.writeString("We Received Everything! Record data and refresh. ")
                    serial.writeLine(" ")
                } else {
                    serial.writeString("We Received Everything! Refreshing. ")
                    serial.writeLine(" ")
                }
            }
            basic.showLeds(`
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                . . . . .
                `)
            if (Write_Data == 1) {
                serial.writeString("" + Past_DD_MM_YYYY + "," + Past_HH_MM_SS + "," + Sensor_Data[1] + ",")
                basic.pause(100)
                serial.writeString("" + Sensor_Data[2] + "," + Sensor_Data[3] + "," + Sensor_Data[4] + ",")
                basic.pause(100)
                serial.writeString("" + Sensor_Data[5] + "," + Sensor_Data[6] + ",")
                if (Sensor_Data[7] == 1) {
                    serial.writeString("N")
                } else if (Sensor_Data[7] == 2) {
                    serial.writeString("NE")
                } else if (Sensor_Data[7] == 3) {
                    serial.writeString("E")
                } else if (Sensor_Data[7] == 4) {
                    serial.writeString("SE")
                } else if (Sensor_Data[7] == 5) {
                    serial.writeString("S")
                } else if (Sensor_Data[7] == 6) {
                    serial.writeString("SW")
                } else if (Sensor_Data[7] == 7) {
                    serial.writeString("W")
                } else if (Sensor_Data[7] == 8) {
                    serial.writeString("NW")
                } else {
                    serial.writeString("???")
                }
                basic.pause(100)
                serial.writeString("," + Sensor_Data[8] + "," + Sensor_Data[9])
                serial.writeLine(" ")
            }
        } else {
            if (Debug == 1) {
                serial.writeString("Missed some data... Request data set at next interval.")
                serial.writeLine(" ")
            }
            basic.showLeds(`
                # # . # #
                # . . . #
                # . . . #
                # . . . #
                # # . # #
                `)
        }
        for (let index = 0; index <= Rx_Data_Check.length; index++) {
            Rx_Data_Check.insertAt(index, 0)
            deleted_item = Rx_Data_Check.removeAt(index)
        }
        Total_Rx_Data = 0
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(50)
    basic.clearScreen()
})
let deleted_item = 0
let Write_Data = 0
let Past_Seconds = 0
let Past_Minutes = 0
let Past_Hour = 0
let Past_HH_MM_SS = ""
let Past_DD_MM_YYYY = ""
let Total_Rx_Data = 0
let Rx_Data_Check: number[] = []
let Sensor_Data: number[] = []
let Debug = 0
Debug = 1
let Set_RTC = 0
if (Debug == 0) {
    serial.redirect(
    SerialPin.P15,
    SerialPin.P14,
    BaudRate.BaudRate9600
    )
} else if (Debug == 1) {
    serial.redirect(
    SerialPin.USB_TX,
    SerialPin.USB_RX,
    BaudRate.BaudRate115200
    )
    serial.writeString("micro:bit set to debugging mode")
    serial.writeLine("")
    if (Set_RTC == 1) {
        gatorRTC.setDate(
        dayNames.Monday,
        Months.January,
        0,
        0
        )
        gatorRTC.set12Time(
        0,
        0,
        0,
        Afternoon.AM
        )
        gatorRTC.set1224Mode(TimeMode.Military)
    }
    serial.writeString(gatorRTC.getDateWorld())
    serial.writeString(",")
    serial.writeString(gatorRTC.getTime())
    serial.writeLine(" ")
}
radio.setGroup(1)
serial.writeString("Date [dd-mm-yyyy]" + "," + "Time [hh:mm:ss]" + "," + "BME280 Temperature [degC]" + "," + "BME280 Humidity [rH]" + "," + "BME280 Pressure [hPa]" + "," + "BME280 Altitude [m]" + "," + "Rain [inches]" + "," + "Wind Speed [mph]" + "," + "Wind Direction" + "," + "Soil Moisture" + "," + "Soil Temperature [Deg C]")
serial.writeLine(" ")
Sensor_Data = [
"303",
"25",
"35",
"847",
"4898",
"0",
"0",
"0",
"6",
"25"
]
Rx_Data_Check = [
"0",
"0",
"0",
"0",
"0",
"0",
"0",
"0",
"0",
"0"
]
Total_Rx_Data = 0
Past_DD_MM_YYYY = gatorRTC.getDateWorld()
Past_HH_MM_SS = gatorRTC.getTime()
let Interval = 30
if (Interval >= 3600) {
    if (gatorRTC.getTimeComponent(TimeType.Hours) == 0) {
        Past_Hour = 23
    } else {
        Past_Hour = gatorRTC.getTimeComponent(TimeType.Hours) - 1
    }
    Past_Minutes = gatorRTC.getTimeComponent(TimeType.Minutes)
    Past_Seconds = gatorRTC.getTimeComponent(TimeType.Seconds)
} else if (Interval < 3600 && Interval >= 60) {
    Past_Hour = gatorRTC.getTimeComponent(TimeType.Hours)
    if (gatorRTC.getTimeComponent(TimeType.Minutes) == 0) {
        Past_Minutes = 60 + gatorRTC.getTimeComponent(TimeType.Minutes) - 1
    } else {
        Past_Minutes = gatorRTC.getTimeComponent(TimeType.Minutes) - 1
    }
    Past_Seconds = gatorRTC.getTimeComponent(TimeType.Seconds)
} else if (Interval < 60) {
    Past_Minutes = gatorRTC.getTimeComponent(TimeType.Minutes)
    Past_Seconds = gatorRTC.getTimeComponent(TimeType.Seconds)
    if (gatorRTC.getTimeComponent(TimeType.Seconds) == 0) {
        Past_Seconds = 60 + gatorRTC.getTimeComponent(TimeType.Seconds) - 1
    } else {
        Past_Seconds = gatorRTC.getTimeComponent(TimeType.Seconds) - 1
    }
}
basic.forever(function () {
    if (0 * 60 * 60 + gatorRTC.getTimeComponent(TimeType.Seconds) * 60 + gatorRTC.getTimeComponent(TimeType.Seconds) - Interval >= Past_Hour * 60 * 60 + Past_Minutes * 60 + Past_Seconds) {
        Past_Hour = gatorRTC.getTimeComponent(TimeType.Hours)
        Past_Minutes = gatorRTC.getTimeComponent(TimeType.Seconds)
        Past_Seconds = gatorRTC.getTimeComponent(TimeType.Seconds)
        Past_DD_MM_YYYY = gatorRTC.getDateWorld()
        Past_HH_MM_SS = gatorRTC.getTime()
        radio.sendValue("Request", 1)
    }
})
