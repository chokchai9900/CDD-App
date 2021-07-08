export class ResultModel{
    _id: string;
    ChildId: string;
    resultData: RateResultModel[];
}

export class RateResultModel{
    rateDataId:string;
    age: string;
    rateType: string;
    isPass: boolean;
}