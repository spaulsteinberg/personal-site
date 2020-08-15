export interface IPageViews {
    count:number;
    uniques:number;
    views:IDate[];
}

interface IDate {
    count:number;
    uniques:number;
    timestamp:Date;
}