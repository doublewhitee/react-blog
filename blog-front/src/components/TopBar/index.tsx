import React from 'react';
import './index.less'

interface TopBarProps {
  height?: number
}

const TopBar: React.FC<TopBarProps> = props => {
  const { height } = props
  return (
    <div className="top-bar" style={{ height: `${height}px` }}>
      
    </div>
  );
};

TopBar.defaultProps = {
  height: 64
}

export default TopBar;
