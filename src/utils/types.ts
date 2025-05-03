

// User related types
export interface UserTypes{
    _id:string;
    name:string;
    email:string;
    password?:string;
    gender:"male"|"female"|"other";
    mobile:string;
    role:"agent"|"admin";
    createdAt:Date;
    updatedAt:Date;
}
export type CreateUserBodyTypes = Pick<UserTypes, "name"|"email"|"password"|"gender"|"mobile"|"role">;
export type LoginUserBodyTypes = Pick<UserTypes, "email"|"password">;

// Client related types
export interface ClientTypes{
    _id:string;
    serialNumber:number;
    name:string;
    guardian:string;
    email:string;
    mobile:string;
    gender:"male"|"female"|"other";
    ownerShipStatus:"pending"|"completed"|"registered"|"cancelled";
    createdAt:Date;
    updatedAt:Date;
}
export type ClientTableTransformedTypes = Pick<ClientTypes, "_id"|"serialNumber"|"createdAt"|"name"|"guardian"|"email"|"gender"|"mobile"|"ownerShipStatus">
export type CreateClientBodyTypes = Pick<ClientTypes, "serialNumber"|"name"|"guardian"|"email"|"mobile"|"gender">;

// Plot related types
export interface PlotTypes{
    [key:string]:unknown;
    _id:string;
    plotNo:number;
    size:number;
    rate:number;
    length:number;
    breath:number;
    site:string;
    clientID?:string;
    duration:number;
    hasSold:boolean;
    shouldPay:number;
    paid:number;
    agentID?:string;
    beltRange:number[];
    plotStatus:"pending"|"completed"|"registered"|"vacant";
    createdAt:Date;
    updatedAt:Date;
}
export type CreatePlotBodyTypes = Pick<PlotTypes, "plotNo"|"size"|"rate"|"site"|"duration"|"length"|"breath">&Partial<Pick<PlotTypes, "plotStatus"|"clientID"|"hasSold"|"agentID"|"paid"|"shouldPay"|"updatedAt"|"createdAt">>;
export type UpdatePlotBodyTypes = Partial<Pick<PlotTypes, "plotNo"|"size"|"rate"|"clientID"|"duration"|"length"|"breath"|"hasSold"|"shouldPay"|"paid"|"agentID"|"plotStatus">>&{plotID:string;};

//Slip related types
export interface SlipTypes{
    [key:string]:unknown;
    _id:string;
    slipType:"downpay"|"token"|"emi";
    slipNo:number;
    modeOfPayment:"cash"|"cheque"|"transfer";
    amount:number;
    clientID:string;
    plotID:string;
    agentID:string;
    isCancelled:boolean;
    cancelledFor:"bounced"|"cash not received"|"transaction failed";
    paymentID?:string;
    remark:string;
    createdAt:string;
    updatedAt:string;
}
export type CreateSlipBodyTypes = Pick<SlipTypes, "slipType"|"slipNo"|"modeOfPayment"|"paymentID"|"amount"|"clientID"|"plotID"|"agentID">;
export type UpdateSlipBodyTypes = Partial<Pick<SlipTypes, "slipType"|"isCancelled"|"cancelledFor"|"remark">>&{slipID:string};

// Site related types
export interface PlotBeltTypes {
    noOfPlots:number;
    lastPlotNo:number;
    baseSize:number;
}
export interface SiteTypes{
    [key:string]:unknown;
    _id:string;
    siteName:string;
    totalSize:number;
    soldArea:number;
    plotsInSingleRow:PlotBeltTypes[];
}
export type CreateSiteBodyTypes = Pick<SiteTypes, "siteName"|"totalSize">;
export type UpdateSiteBodyTypes = Partial<Pick<SiteTypes, "totalSize"|"soldArea">>&{siteID:string;}&{noOfPlots?:number; lastPlotNo?:number; baseSize?:number;};

export interface FetchAPIHandlerArgTypes {
    apiName:string;
    endpoint:string; 
    isFormDataType?:boolean;
    method:"GET"|"POST"|"PUT"|"DELETE";
    credentials?:boolean;
    body?:BodyInit|null|undefined;
}
export type ApiResponseTypes<T> = {success:boolean; message:string; jsonData:T};

export type RoutesTypes = "clients"|"plots"|"slips"|"sites"|"agents"|"login"|"register"|"home"|"me";