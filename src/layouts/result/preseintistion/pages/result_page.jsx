import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import colors from '../../../../assets/theme/base/colors';
import Lottie from 'lottie-react';
import results from '../../../../assets/lottie/results.json';
import typography from '../../../../assets/theme/base/typography';
import ResultCard from '../components/result_card';
import emptyData from '../../../../assets/lottie/empty.json';

const ResultPage = () => {
        const { data } = useSelector(state => state.queryService);

        return (
                <Box>
                        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.gradients.info.state }}>
                                <Typography typography={typography.d6} sx={{ px: 2 }}>IR Search Engine</Typography>
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
                </Box>
        );
};

export default ResultPage;
