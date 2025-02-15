

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
export type CreateClientBodyTypes = Pick<ClientTypes, "serialNumber"|"name"|"guardian"|"email"|"mobile"|"gender">;

// Plot related types
export interface PlotTypes{
    _id:string;
    plotNo:number;
    size:number;
    rate:number;
    dimention:{
        length:number;
        width:number;
    };
    site:string;
    clientID?:string;
    duration:number;
    hasSold:boolean;
    shouldPay:number;
    paid:number;
    agentID?:string;
    plotStatus:"pending"|"completed"|"registered"|"cencelled";
    createdAt:Date;
    updatedAt:Date;
}
export type CreatePlotBodyTypes = Pick<PlotTypes, "plotNo"|"size"|"rate"|"dimention"|"site"|"clientID"|"duration"|"hasSold"|"shouldPay"|"paid"|"agentID"|"plotStatus">;
export type UpdatePlotBodyTypes = Pick<PlotTypes, "plotNo"|"size"|"rate"|"dimention"|"clientID"|"duration"|"hasSold"|"shouldPay"|"paid"|"agentID"|"plotStatus">&{plotID:string;};

//Slip related types
export interface SlipTypes{
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
    remark:string;
    createdAt:Date;
    updatedAt:Date;
}
export type CreateSlipBodyTypes = Pick<SlipTypes, "slipType"|"slipNo"|"modeOfPayment"|"amount"|"clientID"|"plotID"|"agentID">;
export type UpdateSlipBodyTypes = Pick<SlipTypes, "slipType"|"slipNo"|"modeOfPayment"|"amount"|"clientID"|"plotID"|"agentID">&{slipID:string};

// Site related types
export interface SiteTypes{
    _id:string;
    siteName:string;
    totalSize:number;
}
export type CreateSiteBodyTypes = Pick<SiteTypes, "siteName"|"totalSize">;
export type UpdateSiteBodyTypes = Partial<Pick<SiteTypes, "siteName"|"totalSize">>&{siteID:string;};

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