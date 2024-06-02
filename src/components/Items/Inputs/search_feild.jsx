import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../../../assets/theme/base/colors';

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
                                px: 5,
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
                                                        <SearchIcon style={{ color: colors.primary.main }} />
                                                ),
                                                endAdornment: (
                                                        loadingSuggestions ? <CircularProgress size={24} sx={{ color: colors.primary.main }} /> : null
                                                ),
                                                sx: {
                                                        '&::placeholder': {
                                                                color: colors.primary.main,
                                                                opacity: 1,
                                                        },
                                                },
                                        }}
                                        sx={{
                                                backgroundColor: colors.grey[200],
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                borderTopLeftRadius: 15,
                                                borderBottomLeftRadius: suggestions.length > 0 ? 0 : 0,
                                                '& fieldset': {
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                        borderTopLeftRadius: 15,
                                                        borderBottomLeftRadius: suggestions.length > 0 ? 0 : 0,
                                                },
                                                '& .MuiInputBase-input::placeholder': {
                                                        color: colors.dark.main,
                                                        opacity: 1,
                                                },
                                        }}
                                />
                                <Button
                                        variant="contained"
                                        onClick={onSearch}
                                        disabled={value === null || value === ''}
                                        sx={{
                                                height: 45,
                                                backgroundColor: colors.gradients.info.state,
                                                color: colors.white.main,
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                                borderTopRightRadius: 16,
                                                borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                marginLeft: 0,
                                                '&:disabled': {
                                                        backgroundColor: colors.gradients.info.state,
                                                        color: colors.white.main,
                                                          cursor: 'not-allowed' 
                                                }
                                        }}
                                >
                                        {isLoading ? <CircularProgress size={24} sx={{ color: colors.white.main }} /> : 'Search'}
                                </Button>

                                {showSuggestions && suggestions.length > 0 && (
                                        <Box
                                                sx={{
                                                        mt:-0.8,
                                                        position: 'absolute',
                                                        width: '93%',
                                                        top: '50px', // Adjust this value as needed
                                                        backgroundColor: colors.grey[200],
                                                        borderRadius: 4,
                                                        // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: suggestions.length > 0 ? 0 : 0,
                                                        borderTopLeftRadius: 0,
                                                        borderBottomLeftRadius: suggestions.length > 0 ? 0 : 0,
                                                }}
                                        >
                                                {suggestions.map((suggestion, index) => (
                                                        <Box
                                                                key={index}
                                                                sx={{
                                                                        fontSize:'15px',
                                                                        py: '5px',
                                                                        px: '10px',
                                                                        cursor: 'pointer',
                                                                        '&:hover': {
                                                                                backgroundColor: colors.grey[200],
                                                                        },
                                                                }}
                                                                onClick={() => handleSuggestionClick(suggestion)}
                                                        >
                                                                {suggestion}
                                                        </Box>
                                                ))}
                                        </Box>
                                )}
                        </Box>
                      
                </Box>
        );
}

export default SearchField;
