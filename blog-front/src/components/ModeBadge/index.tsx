import React from 'react';
import './index.less';

interface ModeBadgeProps {
  position?: 'top-left' | 'top-right'
  size?: number
  handleClickBadge: React.MouseEventHandler
}

const ModeBadge: React.FC<ModeBadgeProps> = props => {
  const { position, size, handleClickBadge } = props

  return (
    <div
      className="mode-bagde"
      onClick={handleClickBadge}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: position === 'top-left' ? -size! / 2 : 'auto',
        right: position === 'top-right' ? -size! / 2 : 'auto',
        top: -size! / 2
      }}
    />
  );
};

ModeBadge.defaultProps = {
  position: 'top-left',
  size: 30
}

export default ModeBadge;
