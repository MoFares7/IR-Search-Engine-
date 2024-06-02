import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Snackbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import colors from '../../../../assets/theme/base/colors';
import Lottie from 'lottie-react';
import results from '../../../../assets/lottie/results.json';
import typography from '../../../../assets/theme/base/typography';
import ResultCard from '../components/result_card';
import emptyData from '../../../../assets/lottie/empty.json';
import { querySimilaryResultService } from '../../service/similary_result_service';

const ResultPage = () => {
        const dispatch = useDispatch();
        const { data, similarityData } = useSelector(state => state.queryService);
        const dataResult = useSelector(state => state.querySimilaryResultService);
        const loadingData = useSelector(state => state.querySimilaryResultService.loading);
        const location = useLocation();
        const navigate = useNavigate();
        const { selectedDataset, selectedModel } = location.state || {};
        const [loadingCard, setLoadingCard] = useState(null);
        const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const handleFetchSimilarity = (id, doc_id, doc_content, cluster, index) => {
                setLoadingCard(id);
                dispatch(querySimilaryResultService({
                        payload: {
                                dataset: selectedDataset,
                                id,
                                doc_id,
                                doc_content,
                                cluster,
                                index
                        }
                })).then((action) => {
                        if (action.payload && action.payload.length > 0) {
                                // Process the response data
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

        return (
                <Box>
                        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.gradients.info.state }}>
                                <Typography typography={typography.d6} sx={{ px: 3 }}>Search Engine</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Lottie autoPlay animationData={results} style={{ width: 120, height: 120 }} />
                                </Box>
                        </Box>
                        <Grid container spacing={2} sx={{ p: 3, justifyContent: 'center', textAlign: 'center' }}>
                                {data && data.length > 0 ? (
                                        data.slice(0, 25).map((item) => (
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
                                                <Typography typography={typography.body2} sx={{ color: colors.white.main }}>
                                                        No results found. Please try a different query
                                                </Typography>
                                        </Box>
                                )}
                        </Grid>
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
