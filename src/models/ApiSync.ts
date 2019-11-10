import axios, { AxiosResponse, AxiosError, AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {

  constructor(public rootUrl: string) {}

  async fetch(id: number): Promise<T> {
    try {
      const { data } = await axios.get(`${this.rootUrl}/${id}`);
      return data as T;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async save(data: T): Promise<T> {
    const { id } = data;
    const HTTP_VERB = id ? 'put': 'post'; 
    const url =
      `${this.rootUrl}${HTTP_VERB === 'put' ? `/${id}` : ''}`;
      
    try {  
      const { data: savedData } = await axios[HTTP_VERB](url, data);
      return savedData as T;
    } catch (e) {
      throw new Error(e.message);
    }
    
  }
}