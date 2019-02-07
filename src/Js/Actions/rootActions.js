export const addItem = (item) => {
    return {
        type: "Add_Item",
        payload: item
    }
}


export const removeItem = (item) => {
    return {
        type: "Remove_Item",
        payload: item
    }
}


export const addQuantity = (item) => {
    return {
        type: "Add_Quantity",
        payload: item
    }
}



export const lowerQuantity = (item) => {
    return {
        type: "Lower_Quantity",
        payload: item
    }
}



export const resetState = () => {
    return {
        type: "Reset_State"
    }
}
