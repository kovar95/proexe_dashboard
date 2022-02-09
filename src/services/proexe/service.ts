import http from "../../http-common";
import { ApiUser } from './apiTypes';
import createUser from "./createUser";


class ProexeDataService {
   async getAll() {
     const response = await http.get<Array<ApiUser>>("/karolkproexe/jsonplaceholderdb/data");
     return response.data.map(user => createUser(user));
    }
}
export default new ProexeDataService();