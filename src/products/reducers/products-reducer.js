import _ from 'lodash';

const initialState = {
    isLoading: false,
    isError: false,
    sortBy: "id",
    hasMore: true,
    page: 0,
    limit: 15,
    data: {}
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_GET_PRODUCTS':
            return {
                ...state,
                isLoading: true,
                isError: false,
                page: action.params.page,
                sortBy: action.params.sortBy,
                limit: action.params.limit
            }
        case 'FINISH_GET_PRODUCTS':
            let moreProducts = {};
            let pageNumber = action.params.page;
            moreProducts[pageNumber] = action.data;

            return {
                ...state,
                isLoading: false,
                isError: false,
                page: action.params.page,
                sortBy: action.params.sortBy,
                limit: action.params.limit,
                hasMore: !(Object.keys(state.data).length > 0 && action.data.length < 14),
                data: Object.assign(state.data, moreProducts)
            }
        case 'ERROR_GET_PRODUCTS':
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: {}
            }
        case 'SORT_BY_SELECTION_CHANGED':
            /* if sort not one of the below options return current state */
            if (!(_.includes(['id', 'size', 'price'], action.sortBy))) {
                return state;
            }
            else if (state.sortBy === action.sortBy)
                return state;
            else
                return {
                    ...state,
                    sortBy: action.sortBy,
                    page: 0,
                    hasMore: true,
                    data: {}
                }
        default:
            return state
    }
}

export default ProductsReducer;
