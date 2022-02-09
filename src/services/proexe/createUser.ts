import { ApiUser } from "./apiTypes";
import { User } from "./types";

const createUser = (userInfo: ApiUser): User => {
    const { id, name, username, email, address: {city}} = userInfo;
    return {
        id,
        name,
        username,
        email,
        city
    };
};

export default createUser;