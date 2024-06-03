import { configureStore } from '@reduxjs/toolkit';
import queryServiceReducer from './layouts/home/services/query_service'
import querySuggestionsServiceReduce from './layouts/home/services/query_suggestion_service'
import querySimilaryResultServiceReducer from './layouts/result/service/similary_result_service'
import queryTopicsReducer from './layouts/similarty_result/service/topics_service'

const store = configureStore({
        reducer: {
                queryService: queryServiceReducer,
                querySuggestionsService: querySuggestionsServiceReduce,
                querySimilaryResultService: querySimilaryResultServiceReducer,
                queryTopics: queryTopicsReducer
        }
});

export default store;