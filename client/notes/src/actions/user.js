// Handle label change
// ----------------------------------------------------------------------------
export const handleLabelChange = (label) =>({
    type : 'LABEL_CHANGED',
    label
})

// Labels fetched
// ----------------------------------------------------------------------------
export const labelsFetched = (labels) => ({
    type : 'LABELS_FETCHED',
    labels
})

// Label added
// ----------------------------------------------------------------------------
export const labelAdded = (label) => ({
    type : 'LABEL_ADDED',
    label
})

// Label deleted
// ----------------------------------------------------------------------------
export const labelDeleted = (label_id) => ({
    type : 'LABEL_DELETED',
    label_id
})

// Current label changed
// ----------------------------------------------------------------------------
export const currentLabelChanged = (currentLabel) => ({
    type : 'CURRENT_LABEL_CHANGED',
    currentLabel
})


