import toast from "react-hot-toast";
import { ApiResponseTypes, ClientTypes, FetchAPIHandlerArgTypes, PlotTypes, SiteTypes, SlipTypes, UserTypes } from "./types";

export const fetchAPIHandler = async<T>({
    apiName, endpoint, isFormDataType, method, credentials, body
}:FetchAPIHandlerArgTypes) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_UR}${endpoint}`, {
            ...(isFormDataType&&{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }),
            method,
            ...(credentials&&{credentials:"include"}),
            body
        });

        const data = await res.json();

        console.log(`------------- ${apiName} (1)`);
        console.log(data);
        console.log(`------------- ${apiName} (1)`);


        if (data.success) {
            toast.success(data.message, {
                duration:2000,
                position:"top-center"
            });
        }
        else{
            toast.error(data.message, {
                duration:2000,
                position:"top-center"
            });
        }

        return data as ApiResponseTypes<T>;
    } catch (error) {
        console.log(`############# ${apiName} (1)`);
        console.log(error);
        console.log(`############# ${apiName} (2)`);
        toast.error((error as {message:string}).message, {
            duration:2000,
            position:"top-center"
        })
        return error as ApiResponseTypes<T>;
    }
};

// User related apis
export const findAllUsers = async() => {
    const data = await fetchAPIHandler<UserTypes[]>({
        apiName:"findAllUsers",
        endpoint:"/user/all-users",
        credentials:true,
        method:"GET"
    });

    return data;
};
export const register = async() => {
    const data = await fetchAPIHandler<null>({
        apiName:"register",
        endpoint:"/user/register",
        method:"POST"
    });

    return data;
};
export const login = async() => {
    const data = await fetchAPIHandler<null>({
        apiName:"login",
        endpoint:"/user/login",
        method:"POST"
    });

    return data;
};
export const logout = async() => {
    const data = await fetchAPIHandler<null>({
        apiName:"logout",
        endpoint:"/user/logout",
        method:"POST"
    });

    return data;
};

// Client related apis
export const findAllClients = async() => {
    const data = await fetchAPIHandler<ClientTypes[]>({
        apiName:"findAllClients",
        endpoint:"/client/all-clients",
        credentials:true,
        method:"GET"
    });

    return data;
};
export const createClient = async() => {
    const data = await fetchAPIHandler<ClientTypes>({
        apiName:"createClient",
        endpoint:"/client/create",
        credentials:true,
        method:"POST"
    });

    return data;
};
export const cancelClient = async() => {
    const data = await fetchAPIHandler<null>({
        apiName:"cancelClent",
        endpoint:"/client/cancel",
        credentials:true,
        method:"DELETE"
    });

    return data;
};

// Plot related apis
export const findAllPlots = async() => {
    const data = await fetchAPIHandler<PlotTypes[]>({
        apiName:"findAllPlots",
        endpoint:"/plot/all-plots",
        credentials:true,
        method:"GET"
    });

    return data;
};
export const createPlot = async() => {
    const data = await fetchAPIHandler<PlotTypes>({
        apiName:"createPlot",
        endpoint:"/plot/create",
        credentials:true,
        method:"POST"
    });

    return data;
};
export const updatePlot = async() => {
    const data = await fetchAPIHandler<PlotTypes>({
        apiName:"updatePlot",
        endpoint:"/plot/update",
        credentials:true,
        method:"PUT"
    });

    return data;
};
export const deletePlot = async() => {
    const data = await fetchAPIHandler<null>({
        apiName:"deletePlot",
        endpoint:"/plot/delete",
        credentials:true,
        method:"DELETE"
    });

    return data;
};

// Slip related apis
export const findAllSlips = async() => {
    const data = await fetchAPIHandler<SlipTypes[]>({
        apiName:"findAllSlips",
        endpoint:"/plot/all-slips",
        credentials:true,
        method:"GET"
    });

    return data;
};
export const createSlip = async() => {
    const data = await fetchAPIHandler<SlipTypes>({
        apiName:"createSlip",
        endpoint:"/plot/create",
        credentials:true,
        method:"POST"
    });

    return data;
};
export const updateSlip = async() => {
    const data = await fetchAPIHandler<null>({
        apiName:"updateSlip",
        endpoint:"/plot/update",
        credentials:true,
        method:"PUT"
    });

    return data;
};


// Site related apis
export const findAllSites = async() => {
    const data = await fetchAPIHandler<SiteTypes[]>({
        apiName:"findAllSites",
        endpoint:"/plot/all-sites",
        credentials:true,
        method:"GET"
    });

    return data;
};
export const createSite = async() => {
    const data = await fetchAPIHandler<SiteTypes>({
        apiName:"createSite",
        endpoint:"/plot/create",
        credentials:true,
        method:"POST"
    });

    return data;
};
export const updateSite = async() => {
    const data = await fetchAPIHandler<SiteTypes>({
        apiName:"updateSite",
        endpoint:"/plot/update",
        credentials:true,
        method:"PUT"
    });

    return data;
};