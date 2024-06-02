import { configureStore } from '@reduxjs/toolkit';
import queryServiceReducer from './layouts/home/services/query_service'
import querySuggestionsServiceReduce from './layouts/home/services/query_suggestion_service'

const store = configureStore({
        reducer: {
                queryService: queryServiceReducer,
                querySuggestionsService: querySuggestionsServiceReduce
        }
});

export default store;