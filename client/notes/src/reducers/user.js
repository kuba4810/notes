export const user = (state = {

    labels: [],
    currentLabel : ''

}, action) => {

    let labels;

    switch (action.type) {

        // FETCH LABELS
        // --------------------------------------------------------------
        case 'LABELS_FETCHED':

            return Object.assign({}, state, {
                labels: [...action.labels]
            })

        // LABEL ADDED
        // --------------------------------------------------------------
        case 'LABEL_ADDED':

            labels = [...state.labels];
            labels.push(action.label);
            return Object.assign({}, state, {
                labels: [...labels]
            })

        // LABEL DELETED
        // --------------------------------------------------------------
        case 'LABEL_DELETED':

            labels = [...state.labels];

            labels = labels.filter(label => label.label_id !== action.label_id);

            return Object.assign({}, state, {
                labels: [...labels]
            })

        // LABEL DELETED
        // --------------------------------------------------------------
        case 'LABEL_CHANGED':

            labels = [...state.labels];

            labels = labels.map(label => {

                if (label.label_id === action.label.label_id) {
                   
                    label.title = action.label.title;
                    return label;
                } else {
                    return label;
                }
        
            });

            return Object.assign({}, state, {
                labels: [...labels]
            })
        
        // LABEL DELETED
        // --------------------------------------------------------------   
        case 'CURRENT_LABEL_CHANGED' :
            return Object.assign({},state,{
                currentLabel : action.currentLabel
            })
        default:
            return state;

    }





}