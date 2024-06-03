// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Box, Grid, Snackbar, Typography, Pagination } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import colors from '../../../../assets/theme/base/colors';
// import Lottie from 'lottie-react';
// import results from '../../../../assets/lottie/results.json';
// import typography from '../../../../assets/theme/base/typography';
// import ResultCard from '../components/result_card';
// import emptyData from '../../../../assets/lottie/empty.json';
// import { querySimilaryResultService } from '../../service/similary_result_service';

// const ITEMS_PER_PAGE = 10;

// const ResultPage = () => {
//         const dispatch = useDispatch();
//         const { data } = useSelector(state => state.queryService);
//         const loadingData = useSelector(state => state.querySimilaryResultService.loading);
//         const location = useLocation();
//         const navigate = useNavigate();
//         const { selectedDataset, selectedModel } = location.state || {};
//         const [loadingCard, setLoadingCard] = useState(null);
//         const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
//         const [errorMessage, setErrorMessage] = useState('');
//         const [currentPage, setCurrentPage] = useState(1);

//         const handleFetchSimilarity = (id, doc_id, doc_content, cluster, index) => {
//                 setLoadingCard(id);
//                 dispatch(querySimilaryResultService({
//                         payload: {
//                                 dataset: selectedDataset === 'wikipedia' ? 'wiki' : 'antique',
//                                 id,
//                                 doc_id,
//                                 doc_content,
//                                 cluster,
//                                 index
//                         }
//                 })).then((action) => {
//                         if (action.payload && action.payload.length > 0) {
//                                 navigate('/similarty-result', { state: { similarityData: action.payload } });
//                         } else {
//                                 setErrorMessage(action.payload.detail.msg || 'An error occurred');
//                                 setErrorSnackbarOpen(true);
//                         }
//                 });
//         };

//         const handleSnackbarClose = () => {
//                 setErrorSnackbarOpen(false);
//         };

//         const handlePageChange = (event, value) => {
//                 setCurrentPage(value);
//         };

//         const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
//         const displayedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//         return (
//                 <Box>
//                         <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.grey[200] }}>
//                                 <Typography typography={typography.d4} sx={{ px: 3, color: colors.black.main }}>Hoop</Typography>
//                                 <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//                                         <Lottie autoPlay animationData={results} style={{ width: 120, height: 120 }} />
//                                 </Box>
//                         </Box>
//                         <Grid container spacing={2} sx={{ p: 3, justifyContent: 'center', textAlign: 'center' }}>
//                                 {displayedData && displayedData.length > 0 ? (
//                                         displayedData.map((item) => (
//                                                 <Box sx={{ width: '75%' }} key={item._id}>
//                                                         <ResultCard
//                                                                 id={item._id}
//                                                                 doc_id={item.doc_id}
//                                                                 doc_content={item.doc_content}
//                                                                 index={item.index}
//                                                                 cluster={item.cluster}
//                                                                 onSimilrtyClick={handleFetchSimilarity}
//                                                                 isLoading={loadingCard === item._id && loadingData}
//                                                                 showSimilarityButton={selectedModel === 'tfidf'}
//                                                         />
//                                                 </Box>
//                                         ))
//                                 ) : (
//                                         <Box sx={{
//                                                 display: 'flex',
//                                                 flexDirection: 'column',
//                                                 textAlign: 'center', alignItems: 'center', justifyContent: 'center'
//                                         }}>
//                                                 <Lottie autoPlay animationData={emptyData} style={{ width: 280, height: 280 }} />
//                                                 <Typography typography={typography.body2} sx={{ color: colors.black.main }}>
//                                                         No results found. Please try a different query
//                                                 </Typography>
//                                         </Box>
//                                 )}
//                         </Grid>
//                         {data && data.length > 0 && (
//                                 <Pagination
//                                         count={pageCount}
//                                         page={currentPage}
//                                         onChange={handlePageChange}
//                                         sx={{ display: 'flex', justifyContent: 'center', m: 4 }}
//                                 />
//                         )}
//                         <Snackbar
//                                 open={errorSnackbarOpen}
//                                 autoHideDuration={4000}
//                                 onClose={handleSnackbarClose}
//                                 message={errorMessage}
//                                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//                         />
//                 </Box>
//         );
// };

// export default ResultPage;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Snackbar, Typography, Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import colors from '../../../../assets/theme/base/colors';
import Lottie from 'lottie-react';
import results from '../../../../assets/lottie/results.json';
import typography from '../../../../assets/theme/base/typography';
import ResultCard from '../components/result_card';
import emptyData from '../../../../assets/lottie/empty.json';
import { querySimilaryResultService } from '../../service/similary_result_service';

const ITEMS_PER_PAGE = 10;

const ResultPage = () => {
        const dispatch = useDispatch();
        const { data = [] } = useSelector(state => state.queryService); 
        const loadingData = useSelector(state => state.querySimilaryResultService.loading);
        const location = useLocation();
        const navigate = useNavigate();
        const { selectedDataset, selectedModel } = location.state || {};
        const [loadingCard, setLoadingCard] = useState(null);
        const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [currentPage, setCurrentPage] = useState(1);

        const handleFetchSimilarity = (id, doc_id, doc_content, cluster, index) => {
                setLoadingCard(id);
                dispatch(querySimilaryResultService({
                        payload: {
                                dataset: selectedDataset === 'wikipedia' ? 'wiki' : 'antique',
                                id,
                                doc_id,
                                doc_content,
                                cluster,
                                index
                        }
                })).then((action) => {
                        if (action.payload && action.payload.length > 0) {
                                navigate('/similarty-result', { state: { similarityData: action.payload } });
                        } else {
                                setErrorMessage(action.payload.detail.msg || 'An error occurred');
                                setErrorSnackbarOpen(true);
                        }
                });
        };

        const handleSnackbarClose = () => {
                setErrorSnackbarOpen(false);
        };

        const handlePageChange = (event, value) => {
                setCurrentPage(value);
        };

        const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
        const displayedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

        return (
                <Box>
                        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.grey[200] }}>
                                <Typography typography={typography.d4} sx={{ px: 3, color: colors.black.main }}>Hoop</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Lottie autoPlay animationData={results} style={{ width: 120, height: 120 }} />
                                </Box>
                        </Box>
                        <Grid container spacing={2} sx={{ p: 3, justifyContent: 'center', textAlign: 'center' }}>
                                {displayedData.length > 0 ? (
                                        displayedData.map((item) => (
                                                <Box sx={{ width: '75%' }} key={item._id}>
                                                        <ResultCard
                                                                id={item._id}
                                                                doc_id={item.doc_id}
                                                                doc_content={item.doc_content}
                                                                index={item.index}
                                                                cluster={item.cluster}
                                                                onSimilrtyClick={handleFetchSimilarity}
                                                                isLoading={loadingCard === item._id && loadingData}
                                                                showSimilarityButton={selectedModel === 'tfidf'}
                                                        />
                                                </Box>
                                        ))
                                ) : (
                                        <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                textAlign: 'center', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                                <Lottie autoPlay animationData={emptyData} style={{ width: 280, height: 280 }} />
                                                <Typography typography={typography.body2} sx={{ color: colors.black.main }}>
                                                        No results found. Please try a different query
                                                </Typography>
                                        </Box>
                                )}
                        </Grid>
                        {data.length > 0 && (
                                <Pagination
                                        count={pageCount}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        sx={{ display: 'flex', justifyContent: 'center', m: 4 }}
                                />
                        )}
                        <Snackbar
                                open={errorSnackbarOpen}
                                autoHideDuration={4000}
                                onClose={handleSnackbarClose}
                                message={errorMessage}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        />
                </Box>
        );
};

export default ResultPage;
