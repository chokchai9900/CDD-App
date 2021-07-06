export class ResultModel{
    _id: string;
    ChildId: string;
    ResultData: RateResultModel[];
}

export class RateResultModel{
    age: string;
    RateType: string;
    isPass: boolean;
}