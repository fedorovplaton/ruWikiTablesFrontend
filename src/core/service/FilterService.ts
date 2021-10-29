import axios, {AxiosResponse} from 'axios';
import {Status} from '../types/Status';
import {Filter} from "../types/Filter";

export class FilterService {
    public static async setFilter (filter: Filter): Promise<Status> {
        const response: AxiosResponse<Status> = await axios.post('http://localhost:5000/detaset/filter/set', {
            ...filter
        });

        return response.data;
    }
}
