import { ApiUser } from "./apiTypes";
import { User } from "./types";

const createUser = (userInfo: ApiUser): User => {
    const { id, name, username, email, address} = userInfo;
    return {
        id,
        name,
        username,
        email,
        city: address?.city ?? '',
    };
};

export default createUser;