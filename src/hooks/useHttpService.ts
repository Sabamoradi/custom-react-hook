import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useState } from "react";

const httpBaseURL = "";

export interface CacheObject {
  response: string;
}

export interface FinalObject {
  data: AxiosResponse<Response> | null;
  error: boolean;
  loading: boolean;
}

const sample = {
  salam: {
    "1": 1,
  },
};

export const httpService: AxiosInstance = axios.create({
  baseURL: httpBaseURL,
  headers: {
    "Content-Type": "application/json",
    "bundle-Id": "me.axon.phr",
  },
});

