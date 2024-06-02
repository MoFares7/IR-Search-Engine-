import React from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../../../assets/theme/base/colors';
import { LocationOnOutlined, NumbersOutlined, PermIdentity, TextDecreaseOutlined, TextFormatOutlined } from '@mui/icons-material';
import borders from './../../../../assets/theme/base/borders';

const ResultCard = ({ id, doc_id, doc_content, index }) => {
        return (
                <>
                        <Box
                                sx={{
                                        py: 2,
                                        my: 1,
                                        transition: 'transform 0.4s ease',
                                        '&:hover': {
                                                transform: 'scale(0.98)',
                                        },
                                        borderRadius: 2,
                                        border: `1px solid ${colors.grey[300]}`,
                                        width: '100%',
                                }}
                        >
                                <Box mx={1} display="block" alignItems="center" color="white" borderRadius={borders.borderRadius.lg} bgColor={colors.white.main}>
                                        <Box p={1} display="flex" justifyContent='space-between'>
                                                <Box display="flex">
                                                        <PermIdentity sx={{ color: colors.white.main }} />
                                                        <Typography fontWeight="light" color="white" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>ID</Typography>
                                                </Box>
                                                <Typography fontWeight="light" color="white" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>{id}</Typography>
                                        </Box>

                                        <Box p={1} display="flex" justifyContent='space-between'>
                                                <Box display="flex">
                                                        <NumbersOutlined sx={{ color: colors.white.main }} />
                                                        <Typography fontWeight="light" color="white" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>Document ID</Typography>
                                                </Box>
                                                <Typography fontWeight="light" color="white" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>{doc_id}</Typography>
                                        </Box>

                                        <Box p={1} display="flex" justifyContent='space-between'>
                                                <Box display="flex">
                                                        <LocationOnOutlined sx={{ color: colors.white.main }} />
                                                        <Typography fontWeight="light" color="white" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>Index</Typography>
                                                </Box>
                                                <Typography fontWeight="light" color="white" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>{index}</Typography>
                                        </Box>


                                        <Box p={1} display="flex" justifyContent='space-between'>
                                                <Box display="flex">
                                                        <TextFormatOutlined sx={{ color: colors.white.main }} />
                                                        <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colors.white.main }}>Document Contents</Typography>
                                                </Box>
                                                <Typography fontWeight="light" color="white" fontSize={'15px'} px={1}
                                                        sx={{
                                                                color: colors.white.main,
                                                                wordWrap: 'break-word',
                                                                whiteSpace: 'pre-wrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                maxWidth: '100%',
                                                                textAlign: 'end'
                                                        }}
                                                >
                                                        {doc_content}
                                                </Typography>
                                        </Box>
                                </Box>
                        </Box>

                </>
        );
}

export default ResultCard;


