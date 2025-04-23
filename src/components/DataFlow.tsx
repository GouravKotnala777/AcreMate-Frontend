import { ReactNode } from "react";


interface DataFlowHandlerPropTypes<T>{
    isLoading:boolean;
    isError:boolean;
    dataArray:T[];
    //error:{success:boolean; message:string; jsonData:object};

    LoadingComponent:ReactNode;
    DataExistComponent:ReactNode;
    DataNotExistComponent:ReactNode;
    ErrorComponent:ReactNode;
}

const DataFlowHandler = <T extends object>({
    isLoading, dataArray, isError,
    LoadingComponent, DataExistComponent, DataNotExistComponent, ErrorComponent
}:DataFlowHandlerPropTypes<T>) => {
    return(
        <div className="flow_cont">
            {
                (isLoading && !isError) &&
                    LoadingComponent
            }
            {
                (dataArray.length === 0 && !isLoading && !isError) ?
                    DataNotExistComponent
                    :
                    DataExistComponent
            }
            {
                (isError) &&
                    ErrorComponent
            }
        </div>
    )
};

export default DataFlowHandler;