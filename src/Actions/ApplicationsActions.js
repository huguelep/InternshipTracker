import API from "./API";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

export const fetchAll = () => dispatch => {
    API.Application().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(
            error => console.log(error)
        )
}

export const create = (data, onSuccess) => dispatch => {
    API.Application().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(error => console.log(error))
}

export const update = (id, data, onSuccess) => dispatch => {
    API.Application().update(id, data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id, ...data}
        })
        onSuccess()
    })
    .catch(error => console.log(error))
}

export const deleteEntry = (id, onSuccess) => dispatch => {
    API.Application().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(error => console.log(error))
}