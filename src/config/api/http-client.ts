import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadRequest = 400,
}

const headers: any = {
  "Content-Type": "application/json",
};

const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token !== null && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

class HttpClient {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: "http://localhost:3030",
      headers,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private async handleError(error: any) {
    if (!error) return;
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      case StatusCode.Unauthorized: {
        break;
      }
      case StatusCode.TooManyRequests: {
        break;
      }
    }
    return Promise.reject(error);
  }
}

export const httpClient = new HttpClient();
