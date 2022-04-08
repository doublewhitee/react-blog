import React, { useEffect } from 'react';
import './index.less'

interface DrawerProps {
  width?: string
  id: string
  visible: boolean
  onClose: Function
}

const Drawer: React.FC<DrawerProps> = props => {
  const { width, id, visible, onClose } = props

  useEffect(() => {
    const item = document.getElementById(id)!
    if (visible) {
      item.classList.add('open')
      item.classList.remove('hide')
    } else {
      item.classList.remove('open')
    }
  }, [id, visible])

  const onDrawerClose = () => {
    const item = document.getElementById(id)!
    item.classList.add('hide')
    setTimeout(() => {
      onClose()
    }, 990)
  }

  return (
    <div
      className="drawer-mask"
      onClick={onDrawerClose}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div
        style={{ width }}
        className="drawer-content"
        id={id}
        onClick={(e) => { e.stopPropagation() }}
      >
        { props.children }
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  width: '30%'
}

export default Drawer;
