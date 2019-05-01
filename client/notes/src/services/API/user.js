import axios from 'axios';
const url = 'http://localhost:8080/api'

// ADD LABEL
// ----------------------------------------------------------------------------
export const addLabel = async (title, id) => {

    console.log('API title : ', title)

    try {

        let res = await axios.post(`${url}/label`, {
            title: title,
            id: id
        });

        if (res.data.response === 'failed') {
            throw 'failed'
        }

        return {
            response: 'success',
            label_id: res.data.label_id
        }

    } catch (error) {

        console.log(error);
        return {
            response: 'failed'
        }

    }

}

// DELETE LABEL
// ----------------------------------------------------------------------------

export const deleteLabel = async (user_id, label_id) => {
    try {

        let res = await axios.post(`${url}/label/delete`, {
            user_id: user_id,
            label_id: label_id
        })

        if(res.data.response === 'failed'){
            throw 'failed'
        }

        return {
            response : 'success'
        }

    } catch (error) {

        console.log(error);
        return {
            response: 'failed'
        }

    }
}


// EDIT LABEL
// ----------------------------------------------------------------------------

export const editLabel = async (user_id, label_id,title) => {
    try {

        let res = await axios.post(`${url}/label/edit`, {
            user_id: user_id,
            label_id: label_id,
            title : title
        })

        if(res.data.response === 'failed'){
            throw 'failed'
        }

        return {
            response : 'success'
        }

    } catch (error) {

        console.log(error);
        return {
            response: 'failed'
        }

    }
}

// GET LABELS
// ----------------------------------------------------------------------------
export const getLabels = async (user_id) => {

    try {

        let res = await axios.get(`${url}/user/labels/${user_id}`);

        if (res.data.response === 'failed') {
            throw 'failed'
        }

        return {
            response: 'success',
            labels: res.data.labels
        }

    } catch (error) {

        console.log(error);
        return {
            response: 'failed'
        }

    }

}