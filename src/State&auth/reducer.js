export const initialState = {
  basket: [],
  totalPrice: 0,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
        totalPrice: state.totalPrice + action.item.price,
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can t remove product (id ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
        totalPrice: state.totalPrice - action.item.price,
      };
    case "ORDER_PAID":
      return {
        ...state,
        basket: []
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_ADDRESS":
      const addresses = action.addresses.filter((address) => {
        if (address.email === state.user.email) {
          return address;
        }
      });

      return {
        ...state,
        user: {
          ...state.user,
          addresses: addresses,
        },
      };
    case "SET_DEFAULT_ADDRESS":
        console.log('set default adress!');
        const filterAddress = [...state.user.addresses];
        const returnAdds= () =>{
            if(filterAddress.every(add => add.default == false)){
                return[
                    ...state.user.addresses,
                    (state.user.addresses[0].default=true)
                ]
            }else{
                return[
                    ...state.user.addresses
                ]
            }
        }
        return {
            ...state,
            user: {
              ...state.user,
              addreses: returnAdds(),
            },
          };
        
    case "CHANGE_DEFAULT_ADDRESS":
        console.log('default address changed');
        const filterAddreses = [...state.user.addresses];
        const setToFalse = filterAddreses.map(add => add.default==false)
        const ind = filterAddreses.findIndex(
            (add) => add.id === action.id
          );


      return {
        ...state,
        user: {
          ...state.user,
          addreses: [
              setToFalse,
              (state.user.addresses[ind].default=true)
          ],
        },
      };

    default:
      return state;
  }
};

export default reducer;
