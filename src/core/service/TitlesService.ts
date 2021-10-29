import axios, {AxiosResponse} from 'axios';
import {Status} from '../types/Status';

export class TitlesService {
    public static async startDownload(): Promise<Status> {
        const response: AxiosResponse<Status> = await axios.post('http://localhost:5000/titles/start');

        return response.data;
    }

    public static async stopDownload(): Promise<Status> {
        const response: AxiosResponse<Status> = await axios.post('http://localhost:5000/titles/stop');

        return response.data;
    }

    public static async getStatus():Promise<Status> {
        const response: AxiosResponse<Status> = await axios.get('http://localhost:5000/titles/status');

        return response.data;
    }
}
