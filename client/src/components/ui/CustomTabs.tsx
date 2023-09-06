import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { jsx } from '@emotion/react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function CustomTabs(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index: number): JSX.Element {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
