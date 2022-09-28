import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';

import { LinearBar } from './progress-bar.styled';

interface ProgressBarProps {
  uploadProgress: number;
}

const ProgressBar = ({ uploadProgress }: ProgressBarProps): ReactElement => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 5 }}>
        <LinearBar color='success' value={uploadProgress} variant='determinate' />
      </Box>
      <Box>
        <Typography color='text.secondary' variant='h5'>{`${uploadProgress}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
