import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../../../assets/theme/base/colors';
import MDTypography from './../../../items/MDTypography/index';
import typography from './../../../assets/theme/base/typography';

const SearchField = ({ value, onChange, onSearch, isLoading, loadingSuggestions, suggestions }) => {
        const [showSuggestions, setShowSuggestions] = useState(false);

        const handleInputChange = (event) => {
                const inputValue = event.target.value;
                onChange(inputValue);
                setShowSuggestions(true);
        };

        const handleSuggestionClick = (suggestion) => {
                onChange(suggestion);
                setShowSuggestions(false);
        };

        return (
                <Box sx={{ position: 'relative', width: '100%' }}>
                        <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                pb: 5,
                                width: '100%',
                        }}>
                                <TextField
                                        variant="outlined"
                                        fullWidth
                                        value={value}
                                        onChange={handleInputChange}
                                        placeholder='Search in our dataset'
                                        InputProps={{
                                                startAdornment: (
                                                        <InputAdornment position="start">
                                                                <SearchIcon style={{ color: colors.white.main }} />
                                                        </InputAdornment>
                                                ),
                                                style: {
                                                        color: colors.white.main, // Color of the input text
                                                },
                                        }}
                                        inputProps={{
                                                style: {
                                                        color: colors.white.main, // Color of the placeholder text
                                                },
                                        }}
                                        sx={{
                                                backgroundColor: colors.black.main,
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                borderTopLeftRadius: 15,
                                                borderBottomLeftRadius: suggestions.length > 0 ? 0 : 0,
                                                '& fieldset': {
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                        borderTopLeftRadius: 15,
                                                        borderBottomLeftRadius: suggestions.length > 0 ? 0 : 0,
                                                        borderColor: colors.grey[700], // Border color
                                                },
                                                '& .MuiInputBase-input::placeholder': {
                                                        color: colors.white.main,
                                                        opacity: 1,
                                                },
                                        }}
                                />
                                <Button
                                        variant="contained"
                                        onClick={onSearch}
                                        disabled={value === null || value === ''}
                                        sx={{
                                                height: 43,
                                                backgroundColor: colors.grey[400],
                                                color: colors.black.main,
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                                borderTopRightRadius: 15,
                                                borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                marginLeft: -0.1,
                                                '&:hover': {
                                                        backgroundColor: colors.grey[400],
                                                },
                                                '&:disabled': {
                                                        backgroundColor: colors.grey[300],
                                                        color: colors.black.main,
                                                        cursor: 'not-allowed'
                                                }
                                        }}
                                >
                                        {isLoading ? <CircularProgress size={24} sx={{ color: colors.black.main }} /> : 'Search'}
                                </Button>
                        </Box>

                        {showSuggestions && (

                                <Box
                                        sx={{
                                                mb: 5,
                                                mt: -0.7,
                                                position: 'absolute',
                                                width: '100%',
                                                top: '50px',
                                                backgroundColor: colors.black.main,
                                                borderRadius: 4,
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: suggestions.length > 0 ? 0 : 0,
                                        }}
                                >
                                        {loadingSuggestions ? (
                                                <MDTypography sx={{ m: 1, color: colors.grey[200] }} typography={typography.body2}>Loading...</MDTypography>
                                        ) : (
                                                suggestions.map((suggestion, index) => (
                                                        <Box
                                                                key={index}
                                                                sx={{
                                                                        color: colors.grey[200],
                                                                        fontSize: '15px',
                                                                        py: '5px',
                                                                        px: '10px',
                                                                        cursor: 'pointer',
                                                                        '&:hover': {
                                                                                backgroundColor: colors.grey[800],
                                                                        },
                                                                }}
                                                                onClick={() => handleSuggestionClick(suggestion)}
                                                        >
                                                                {suggestion}
                                                        </Box>
                                                ))
                                        )}
                                </Box>
                        )}
                </Box>
        );
}

export default SearchField;
