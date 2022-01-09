import api from "../api";


export const getUserById = (userId: string) => {
    return api.get('/users/'+userId).then(
        res => res.data
    )
}