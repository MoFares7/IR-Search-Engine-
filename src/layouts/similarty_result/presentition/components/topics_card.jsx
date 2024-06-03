import React from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../../../assets/theme/base/colors';
import { NumbersOutlined, TextFormatOutlined } from '@mui/icons-material';
import borders from './../../../../assets/theme/base/borders';

const TopicsCard = ({ topicNumber, topicContent }) => {
        return (
                <Box mx={1} my={2} p={2} border={1} borderRadius={borders.borderRadius.lg} borderColor={colors.grey[300]}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                                <Box display="flex" alignItems="center">
                                        <NumbersOutlined sx={{ color: colors.black.main }} />
                                        <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>
                                                Topic Number
                                        </Typography>
                                </Box>
                                <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>
                                        {topicNumber}
                                </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                                <Box display="flex" alignItems="center">
                                        <TextFormatOutlined sx={{ color: colors.black.main }} />
                                        <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>
                                                Topic Contents
                                        </Typography>
                                </Box>
                                <Typography
                                        fontWeight="light"
                                        fontSize={'15px'}
                                        px={1}
                                        sx={{
                                                color: colors.black.main,
                                                wordWrap: 'break-word',
                                                whiteSpace: 'pre-wrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '100%',
                                                textAlign: 'end'
                                        }}
                                >
                                        {topicContent}
                                </Typography>
                        </Box>
                </Box>
        );
};

export default TopicsCard;
