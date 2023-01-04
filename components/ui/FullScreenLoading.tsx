import { Box, CircularProgress, Typography } from "@mui/material";

const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <CircularProgress thickness={2} />
    </Box>
  );
};

export default FullScreenLoading;
