import axios, {AxiosResponse} from "axios";
import {Status} from "../types/Status";

type Filenames = {
    filenames: string[]
}

export class PagesService {
    public static async startDownload(filename: string): Promise<Status> {
        const response = await axios.post('http://localhost:5000/pages/start', {
            filename: filename
        });

        return response.data;
    }

    public static async stopDownload(): Promise<Status> {
        const response = await axios.post('http://localhost:5000/pages/stop');

        return response.data;
    }

    public static async getStatus():Promise<Status> {
        const response: AxiosResponse<Status> = await axios.get('http://localhost:5000/pages/status');

        return response.data;
    }

    public static async getFilenames():Promise<string[]> {
        const response: AxiosResponse<Filenames> = await axios.get('http://localhost:5000/pages/filenames');

        return response.data.filenames;
    }

    public static async  splitFile(filename: string, machineCount: number, splitNames: string[]): Promise<string[]> {
        const response: AxiosResponse<Filenames> = await axios.post('http://localhost:5000/pages/split', {
            filename: filename,
            machineCount: machineCount,
            splitNames: splitNames
        });

        return response.data.filenames;
    }

    public static async deleteFiles(filenames: string[]): Promise<string[]> {
        const response: AxiosResponse<Filenames> = await axios.post('http://localhost:5000//pages/delete/filenames', {
            filenames: filenames
        });

        return response.data.filenames;
    }
}
