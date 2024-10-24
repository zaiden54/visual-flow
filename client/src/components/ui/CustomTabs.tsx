import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function CustomTabs(props: TabPanelProps): JSX.Element {
  const { children, value, index } = props;
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
