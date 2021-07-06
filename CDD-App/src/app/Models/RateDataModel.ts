export class DataModel{
    _id: string;
    RateTitle: string;
    RateType: string;
    RateData: RateModel;
    RateValidate: string[];
    RateAssets: string[];
    ResultAfterRate: AfterRateModel;
}

export class RateModel{
    Equipment: string;
    HowToRate: string;
    Rule: string;
}

export class AfterRateModel{
    ResultPass: string;
    ResultNotPass: string;
    ReplaceEquipment: string;
    Objective: string;
}