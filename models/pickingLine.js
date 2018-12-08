var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var PickingLineSchema = new mongoose.Schema({


    id: Number,
    job: {
        id: Number,
        jobName: String,
        jobOrderCap: Number,
        jobOrderLineCap: Number,
        jobClassification: String,
        jobPriority: String,
        jobShop: String,
        jobStartTime: Date,
        jobFinishTime: Date,
        jobPersonInCharge: String,
        jobFrozen: Boolean
    },
    orderLineRaw: {
        id: String,
        orderPuttingYear: String,
        orderPuttingMonth: String,
        orderPuttingDate: String,
        orderPuttingHour: String,
        orderPuttingAmOrPm: String,
        orderPuttingWeekDay: String,
        orderRefNumber: Number,
        orderLineTotalPrice: Number,
        unitPrice: Number,
        unitString: String,
        orderedUnitsAmount: Number,
        orderedItemCode: String,
        orderedItemDescription: String,
        pickingJobShop: String,
        pickingJobCell: String,
        pickingJobNumber: Number
    },
    pickedItemCode: Number,
    pickedItemAmount: Number,
    deviationOfAmountBetweenPickedVsOrdered: Number,
    pickingTime: Date,
    picker: Date,
    packingTime: Date,
    packer: Date,
    pickingLineFreezed: Boolean,
    pickingLineRedundant: Boolean

});

PickingLineSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("PickingLine", PickingLineSchema);