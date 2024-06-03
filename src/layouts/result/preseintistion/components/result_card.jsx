import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import colors from '../../../../assets/theme/base/colors';
import { EqualizerOutlined, LocationOnOutlined, NumbersOutlined, PermIdentity, TextFormatOutlined } from '@mui/icons-material';
import borders from './../../../../assets/theme/base/borders';

const ResultCard = ({ id, doc_id, doc_content, index, cluster, onSimilrtyClick, isLoading, showSimilarityButton }) => {
        const handleButtonClick = () => {
                onSimilrtyClick(id, doc_id, doc_content, cluster, index);
        };

        return (
                <Box
                        sx={{
                                py: 2,
                                my: 1,
                                transition: 'transform 0.4s ease',
                                '&:hover': {
                                        transform: 'scale(0.995)',
                                },
                                borderRadius: 2,
                                border: `1px solid ${colors.grey[300]}`,
                                width: '100%',
                        }}
                >
                        <Box mx={1} display="block" alignItems="center" color="black" borderRadius={borders.borderRadius.lg} bgColor={colors.black.main}>
                                <Box p={1} display="flex" justifyContent='space-between'>
                                        <Box display="flex" alignItems="center" >
                                                <NumbersOutlined sx={{ color: colors.black.main }} />
                                                <Typography fontWeight="bold" color="black" fontSize={'18px'} px={1} sx={{ color: colors.black.main }}>{doc_id}</Typography>
                                        </Box>
                                </Box>

                                <Box p={1} display="flex" justifyContent='space-between'>
                                        <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{
                                                color: colors.gradients.info.state
                                        }}>{id}</Typography>
                                </Box>

                                {showSimilarityButton ?
                                        <Box p={1} display="flex" justifyContent='space-between'>
                                                <Box display="flex">
                                                        <EqualizerOutlined sx={{ color: colors.black.main }} />
                                                        <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Cluster</Typography>
                                                </Box>
                                                <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>{cluster}</Typography>
                                        </Box>
                                        :
                                        <Box />
                                }

                                <Box p={1} display="flex" justifyContent='space-between'>
                                        <Box display="flex">
                                                <LocationOnOutlined sx={{ color: colors.black.main }} />
                                                <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Index</Typography>
                                        </Box>
                                        <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>{index}</Typography>
                                </Box>

                                <Box p={1} display="flex" justifyContent='space-between'>
                                        <Box display="flex">
                                                <TextFormatOutlined sx={{ color: colors.black.main }} />
                                                <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Document Contents</Typography>
                                        </Box>
                                        <Typography fontWeight="light" color="black" fontSize={'15px'} px={1}
                                                sx={{
                                                        color: colors.black.main,
                                                        wordWrap: 'break-word',
                                                        blackSpace: 'pre-wrap',
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
                        {showSimilarityButton && (
                                <Button
                                        onClick={handleButtonClick}
                                        sx={{
                                                backgroundColor: colors.transparent.main,
                                                border: `1px solid ${colors.black.main}`,
                                                color: colors.black.main,
                                                '&:hover': {
                                                        border: `1px solid ${colors.gradients.info.main}`,
                                                        color: colors.black.main,
                                                },
                                        }}>{isLoading ? <CircularProgress size={24} sx={{ color: colors.black.main }} /> : 'show similar documents'}</Button>
                        )}
                </Box>
        );
}

export default ResultCard;



// import React from 'react';
// import { Box, Button, CircularProgress, Typography } from '@mui/material';
// import colors from '../../../../assets/theme/base/colors';
// import { EqualizerOutlined, LocationOnOutlined, NumbersOutlined, PermIdentity, TextFormatOutlined } from '@mui/icons-material';
// import borders from './../../../../assets/theme/base/borders';

// const ResultCard = ({ id, doc_id, doc_content, index, cluster, onSimilrtyClick, isLoading, showSimilarityButton }) => {
//         const handleButtonClick = () => {
//                 onSimilrtyClick(id, doc_id, doc_content, cluster, index);
//         };

//         return (
//                 <Box
//                         sx={{
//                                 py: 2,
//                                 my: 1,
//                                 transition: 'transform 0.4s ease',
//                                 '&:hover': {
//                                         transform: 'scale(0.995)',
//                                 },
//                                 borderRadius: 2,
//                                 border: `1px solid ${colors.grey[300]}`,
//                                 width: '100%',
//                         }}
//                 >
//                         <Box mx={1} display="block" alignItems="center" color="black" borderRadius={borders.borderRadius.lg} bgColor={colors.black.main}>
//                                 <Box p={1} display="flex" justifyContent='space-between'>
//                                         <Box display="flex">
//                                                 <PermIdentity sx={{ color: colors.black.main }} />
//                                                 <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>ID</Typography>
//                                         </Box>
//                                         <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>{id}</Typography>
//                                 </Box>

//                                 <Box p={1} display="flex" justifyContent='space-between'>
//                                         <Box display="flex">
//                                                 <NumbersOutlined sx={{ color: colors.black.main }} />
//                                                 <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Document ID</Typography>
//                                         </Box>
//                                         <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>{doc_id}</Typography>
//                                 </Box>

//                                 {showSimilarityButton ?
//                                         <Box p={1} display="flex" justifyContent='space-between'>
//                                                 <Box display="flex">
//                                                         <EqualizerOutlined sx={{ color: colors.black.main }} />
//                                                         <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Cluster</Typography>
//                                                 </Box>
//                                                 <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>{cluster}</Typography>
//                                         </Box>
//                                         :
//                                         <Box />
//                                 }

//                                 <Box p={1} display="flex" justifyContent='space-between'>
//                                         <Box display="flex">
//                                                 <LocationOnOutlined sx={{ color: colors.black.main }} />
//                                                 <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Index</Typography>
//                                         </Box>
//                                         <Typography fontWeight="light" color="black" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>{index}</Typography>
//                                 </Box>

//                                 <Box p={1} display="flex" justifyContent='space-between'>
//                                         <Box display="flex">
//                                                 <TextFormatOutlined sx={{ color: colors.black.main }} />
//                                                 <Typography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colors.black.main }}>Document Contents</Typography>
//                                         </Box>
//                                         <Typography fontWeight="light" color="black" fontSize={'15px'} px={1}
//                                                 sx={{
//                                                         color: colors.black.main,
//                                                         wordWrap: 'break-word',
//                                                         blackSpace: 'pre-wrap',
//                                                         overflow: 'hidden',
//                                                         textOverflow: 'ellipsis',
//                                                         maxWidth: '100%',
//                                                         textAlign: 'end'
//                                                 }}
//                                         >
//                                                 {doc_content}
//                                         </Typography>
//                                 </Box>
//                         </Box>
//                         {showSimilarityButton && (
//                                 <Button
//                                         onClick={handleButtonClick}
//                                         sx={{
//                                                 backgroundColor: colors.transparent.main,
//                                                 border: `1px solid ${colors.black.main}`,
//                                                 color: colors.black.main,
//                                                 '&:hover': {
//                                                         border: `1px solid ${colors.gradients.info.main}`,
//                                                         color: colors.black.main,
//                                                 },
//                                         }}>{isLoading ? <CircularProgress size={24} sx={{ color: colors.black.main }} /> : 'Show Similarity'}</Button>
//                         )}
//                 </Box>
//         );
// }

// export default ResultCard;
