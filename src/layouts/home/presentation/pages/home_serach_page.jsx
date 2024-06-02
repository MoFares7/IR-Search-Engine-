import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Typography, Snackbar, Grid } from '@mui/material';
import SearchField from '../../../../components/Items/Inputs/search_feild';
import colors from '../../../../assets/theme/base/colors';
import typography from '../../../../assets/theme/base/typography';
import { queryService } from '../../services/query_service';
import { querySuggestionsService } from '../../services/query_suggestion_service';
import MenuAppBar from '../../../../components/MenuAppbar/menuAppbar';
import MDBox from '../../../../items/MDBox/MDBox';
import PageLayout from '../../../../components/LayoutContainers/PageLayout';
import debounce from 'lodash/debounce';

function HomeSearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryValue, setQueryValue] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('antique');
  const [selectedModel, setSelectedModel] = useState('tfidf');
  const [suggestions, setSuggestions] = useState([]);

  const { loadingQuery, data, error } = useSelector(state => state.queryService);
  const { loading: loadingSuggestionsAPI, data: suggestionData, error: suggestionError } = useSelector(state => state.querySuggestionsService);

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  const handleSendQuery = () => {
    if (!selectedDataset || !selectedModel) {
      setErrorMessage('Please select both dataset and model');
      setErrorSnackbarOpen(true);
      return;
    }
    dispatch(queryService({
      dataset: selectedDataset === 'wikipedia' ? 'wiki' : 'antique',
      model: selectedModel,
      query: queryValue
    })).then((action) => {
      if (queryService.fulfilled.match(action)) {
        navigate('/result');
      } else {
        setErrorMessage(action.payload.detail.msg || 'An error occurred');
        setErrorSnackbarOpen(true);
      }
    });
  };

  const handleQueryChange = (newQueryValue) => {
    setQueryValue(newQueryValue);
  };

  useEffect(() => {
    if (!queryValue) {
      setSuggestions([]);
    } else if (queryValue.length > 2) {
      dispatch(querySuggestionsService({
        dataset: selectedDataset === 'wikipedia' ? 'wiki' : 'antique',
        query: queryValue
      }));
    }
  }, [selectedDataset, queryValue, dispatch]);

  useEffect(() => {
    if (suggestionData) {
      setSuggestions(suggestionData.suggestions.slice(0, 5));
    }
    if (suggestionError) {
      setErrorMessage(suggestionError.error || 'An error occurred while fetching suggestions');
      setErrorSnackbarOpen(true);
    }
  }, [suggestionData, suggestionError]);

  console.log("length: " + suggestions.length);
  return (
    <PageLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColor: '#2f2f2f'
        }}
      />
      <MenuAppBar setSelectedDataset={setSelectedDataset} setSelectedModel={setSelectedModel} />
      <MDBox px={1} width="100%" height="90vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Card sx={{ px: 5, width: '70%', backgroundColor: '#2f2f2f' }}>
            <Box sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
              <Typography typography={typography.d4} sx={{ pb: 2, color: colors.white.main, fontWeight: 'bold' }}>IR Engine</Typography>
            </Box>
            <SearchField
              value={queryValue}
              onChange={handleQueryChange}
              onSearch={handleSendQuery}
              isLoading={loadingQuery}
              loadingSuggestions={loadingSuggestionsAPI}
              suggestions={suggestions}
            />
          </Card>
        </Grid>
      </MDBox>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={errorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </PageLayout>
  );
}

export default HomeSearchPage;
