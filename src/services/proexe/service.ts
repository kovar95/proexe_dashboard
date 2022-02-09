import http from "../../http-common";
import { ApiUser } from './apiTypes';
import { User } from "./types";
import createUser from "./createUser";


class ProexeDataService {
    async getAll() {
      const response = await http.get<Array<ApiUser>>("/");
      return response.data.map(user => createUser(user));
    }
    async get(id: string) {
      const response = await http.get<ApiUser>(`/${id}`);
      return createUser(response.data);
    }
    async create(data: User) {
      const response =  await http.post<User>("/", data);
      return response.data;
    }
    async update(data: User, id: number) {
      const response = await http.put<User>(`/${id}`, data);
      return response;
    }
    async delete(id: number) {
      const response = await http.delete<boolean>(`/${id}`);
      const { status } = response;
      if (status === 200 || status === 404) {
        return true;
      } else {
        return false;
      }
    }
}
export default new ProexeDataService();