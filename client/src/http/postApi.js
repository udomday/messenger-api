import { $authHost, $host } from ".";

export const createPost  = async (messange, date, user_id) => {
    const data = await $authHost.post('api/post', {messange, date, user_id})
    return data
}

export const getPosts  = async () => {
    const data = await $authHost.get('api/post')
    return data
}

export const getOnePost  = async (id) => {
    const data = await $authHost.get('api/post' + `/${id}`)
    return data
}

export const updatePost  = async (id, messange) => {
    const data = await $authHost.put('api/post', {id, messange})
    return data
}

export const deletePost  = async (id) => {
    const data = await $authHost.delete('api/post' + `/${id}`)
    return data
}