// import React, { useState } from 'react';
// import { Box, Grid, Typography, Pagination, Button } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import colors from '../../../../assets/theme/base/colors';
// import Lottie from 'lottie-react';
// import results from '../../../../assets/lottie/results.json';
// import typography from '../../../../assets/theme/base/typography';
// import emptyData from '../../../../assets/lottie/empty.json';
// import ResultCard from '../../../result/preseintistion/components/result_card';
// import { useDispatch } from 'react-redux';
// import { queryTopics } from '../../service/topics_service';

// const ITEMS_PER_PAGE = 10;

// const SimilartyResultPage = () => {
//         const dispatch = useDispatch();
//         const location = useLocation();
//         const { similarityData } = location.state || {};
//         const [currentPage, setCurrentPage] = useState(1);

//         const handlePageChange = (event, value) => {
//                 setCurrentPage(value);
//         };

//         const pageCount = similarityData ? Math.ceil(similarityData.length / ITEMS_PER_PAGE) : 0;
//         const displayedData = similarityData ? similarityData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

//         const handleFetchTopics = () => {
//                 dispatch(queryTopics({
//                         payload: {
//                                 dataset: "myDataSet",
//                                 cluster: "number"
//                         }
//                 }))
//         }

//         return (
//                 <Box>
//                         <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.grey[200] }}>
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                                         <Typography typography={typography.d6} sx={{ px: 3, color: colors.black.main }}>Similar Documents</Typography>
//                                         <Button sx={{
//                                                 mt: 2,
//                                                 backgroundColor: colors.gradients.info.state,
//                                                 '&:hover': {
//                                                         backgroundColor: colors.gradients.info.main
//                                                 }
//                                         }}>
//                                                 Show Topics
//                                         </Button>
//                                 </Box>
//                                 <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//                                         <Lottie autoPlay animationData={results} style={{ width: 120, height: 120 }} />
//                                 </Box>
//                         </Box>
//                         <Grid container spacing={2} sx={{ p: 3, justifyContent: 'center', textAlign: 'center' }}>
//                                 {displayedData && displayedData.length > 0 ? (
//                                         displayedData.map((item, index) => (
//                                                 <Box key={index} sx={{ width: '75%' }}>
//                                                         <ResultCard
//                                                                 id={item._id}
//                                                                 doc_id={item.doc_id}
//                                                                 doc_content={item.doc_content}
//                                                                 index={item.index}
//                                                                 cluster={item.cluster}
//                                                                 showSimilarityButton={true}
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
//                                                 <Typography typography={typography.body2} sx={{ color: colors.white.main }}>
//                                                         No results found. Please try a different query
//                                                 </Typography>
//                                         </Box>
//                                 )}
//                         </Grid>
//                         {similarityData && similarityData.length > 0 && (
//                                 <Pagination
//                                         count={pageCount}
//                                         page={currentPage}
//                                         onChange={handlePageChange}
//                                         sx={{ display: 'flex', justifyContent: 'center', m: 4 }}
//                                 />
//                         )}
//                 </Box>
//         );
// };

// export default SimilartyResultPage;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Pagination, Button, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import colors from '../../../../assets/theme/base/colors';
import Lottie from 'lottie-react';
import results from '../../../../assets/lottie/results.json';
import typography from '../../../../assets/theme/base/typography';
import emptyData from '../../../../assets/lottie/empty.json';
import ResultCard from '../../../result/preseintistion/components/result_card';
import { queryTopics } from '../../service/topics_service';
import TopicsCard from '../components/topics_card';

const ITEMS_PER_PAGE = 10;

const SimilartyResultPage = () => {
        const dispatch = useDispatch();
        const location = useLocation();
        const { selectedDataset, similarityData, cluster } = location.state || {};
        const [currentPage, setCurrentPage] = useState(1);
        const [isShowTopics, setIsShowTopics] = useState(false);
        const [topics, setTopics] = useState([]);
        const loading = useSelector((state) => state.queryTopics.loading);

        const handlePageChange = (event, value) => {
                setCurrentPage(value);
        };

        const pageCount = similarityData ? Math.ceil(similarityData.length / ITEMS_PER_PAGE) : 0;
        const displayedData = similarityData ? similarityData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

        const handleFetchTopics = () => {
                dispatch(queryTopics({
                        payload: {
                                dataset: selectedDataset === 'wikipedia' ? 'wiki' : 'antique',
                                cluster: cluster || 0
                        }
                })).then((action) => {
                        if (action.payload) {
                                setTopics(action.payload);
                                setIsShowTopics(true);
                        }
                });
        };

        const handleCloseTopic = () => {
                setIsShowTopics(false)
        }

        return (
                <Box>
                        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.grey[200] }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography typography={typography.d6} sx={{ px: 3, color: colors.black.main }}>Similar Documents</Typography>
                                        <Button
                                                onClick={isShowTopics ? handleCloseTopic : handleFetchTopics}
                                                sx={{
                                                        mt: 2,
                                                        backgroundColor: colors.gradients.info.state,
                                                        '&:hover': {
                                                                backgroundColor: colors.gradients.info.main
                                                        }
                                                }}
                                        >
                                                {loading ? <CircularProgress size={24} sx={{ color: colors.white.main }} /> : isShowTopics ? 'Hide Topics' : 'Show Topics'}
                                        </Button>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Lottie autoPlay animationData={results} style={{ width: 120, height: 120 }} />
                                </Box>
                        </Box>
                        {isShowTopics ? (
                                topics.length > 0 && (
                                        <Box sx={{ px: 3 }}>
                                                {topics.map((topic, index) => (
                                                        <TopicsCard
                                                                key={index}
                                                                topicNumber={`Topic ${index + 1}`}
                                                                topicContent={topic}
                                                        />
                                                ))}
                                        </Box>
                                )
                        ) : (
                                <Box />
                        )}

                        <Grid container spacing={2} sx={{ p: 3, justifyContent: 'center', textAlign: 'center' }}>
                                {displayedData && displayedData.length > 0 ? (
                                        displayedData.map((item, index) => (
                                                <Box key={index} sx={{ width: '75%' }}>
                                                        <ResultCard
                                                                id={item._id}
                                                                doc_id={item.doc_id}
                                                                doc_content={item.doc_content}
                                                                index={item.index}
                                                                cluster={item.cluster}
                                                        // showSimilarityButton={true}
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
                                                        No similar documents found.
                                                </Typography>
                                        </Box>
                                )}
                        </Grid>
                        {displayedData && displayedData.length > 0 && (
                                <Pagination
                                        count={pageCount}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        sx={{ display: 'flex', justifyContent: 'center', m: 4 }}
                                />
                        )}
                </Box>
        );
};

export default SimilartyResultPage;
