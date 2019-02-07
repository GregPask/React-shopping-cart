import { storeProducts } from "../data";



const initialState = {
    products: storeProducts,
 
    cart: [],
    totalPrice: 0
};


export default function (state = initialState, action) {
    switch (action.type) {
        case "Add_Item":

            state.products[action.payload.id - 1] = {
                ...action.payload
            }

            state.cart.push(action.payload)
            state.totalPrice += action.payload.price;

            return {
                ...state
            }

        case "Remove_Item":

            state.totalPrice -= action.payload[0].total;
            let indexOf = state.cart.findIndex((item) => item.id === action.payload[0].id);
            state.cart.splice(indexOf, 1);

            let payload = action.payload[0];
            console.log(payload);


            let splicy = state.products.splice(action.payload[0].id - 1, 1, payload);
            console.log(splicy);



            return {
                ...state
            }



        case "Add_Quantity":
            console.log(action.payload);

            state.products[action.payload.id - 1] = {
                ...action.payload
            }

            state.totalPrice += action.payload.price;

            return {
                ...state
            }


        case "Lower_Quantity":

            state.products[action.payload.id] = {
                ...action.payload
            }

            state.totalPrice -= action.payload.price;

            return {
                ...state
            }


        case "Reset_State": 
            console.log("Resetting the state");
            return {
            
            ...initialState

        }


        



        default:
            return state;
    }
}
