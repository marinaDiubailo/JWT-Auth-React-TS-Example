import { AxiosResponse } from 'axios';
import $api from '../api/api';
import { IUser } from '../types/user';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}
