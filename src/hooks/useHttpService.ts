import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useState } from "react";

const httpBaseURL = "";

export interface CacheObject {
  response: string;
}

export type RequestMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT"
export interface FinalObject {
  data: AxiosResponse<Response> | null;
  error: boolean;
  loading: boolean;
}

const sample = {
  urlData: {
    name:'data'
  },
};

export const httpService: AxiosInstance = axios.create({
  baseURL: httpBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useHttpService = () => {
  const [cachObj, setCachObj] = useState(null);

  const handleService = (
    url: string,
    requestMethod: RequestMethod,
    reFetch: boolean
  ) => {
    const finalObject: FinalObject = {
      data: null,
      error: false,
      loading: false,
    };

    if (!reFetch && cachObj && url in cachObj) {
      return cachObj[url];
    } else {
      finalObject.loading = true;
      httpService({
        method: requestMethod,
        url,
      })
        .then((response: AxiosResponse<Response>) => {
          setCachObj((prev) =>
            ({...prev,url:response})
          )
          finalObject.error = false;
          finalObject.data = response;
          finalObject.loading = false;
        })
        .catch((err) => {
          finalObject.error = true;
          finalObject.data = null;
          finalObject.loading = false;
        });
        
    }

    return finalObject
  };

  return handleService
};