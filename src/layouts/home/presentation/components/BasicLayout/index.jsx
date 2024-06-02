import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "../../../../../items/MDBox/MDBox";
import PageLayout from "../../../../../components/LayoutContainers/PageLayout";
import MenuAppBar from "../../../../../components/MenuAppbar/menuAppbar";

function BasicLayout({ setSelectedDataset, setSelectedModel, children }) {
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

      <MenuAppBar
        setSelectedDataset={setSelectedDataset}
        setSelectedModel={setSelectedModel}
      />

      <MDBox px={1} width="100%" height="90vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          {children}
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
