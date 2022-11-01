import React, { useEffect, useState } from 'react';
import { ArrowUpOutlined, UnorderedListOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './index.less';

interface ToolBoxProps {
  hasMenuIcon?: boolean
}

const ToolBox: React.FC<ToolBoxProps> = props => {
  const { hasMenuIcon } = props

  const [pagePercentage, setPagePercentage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const app = document.getElementById('app-content')!
    app.addEventListener('scroll', handleScroll)
    return () => {
      app.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = (e: Event) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLElement
    setPagePercentage(Math.ceil(scrollTop / (scrollHeight - clientHeight) * 100))
  }

  const handleGoTop = () => {
    const app = document.getElementById('app-content')!
    const scrollToptimer = setInterval(() => {
      let top = app.scrollTop
      var speed = top / 4
      if (app.scrollTop !== 0) {
        app.scrollTop -= speed
      }
      if (top === 0) {
        clearInterval(scrollToptimer)
      }
    }, 30)
  }

  const handleGoBottom = () => {
    const app = document.getElementById('app-content')!
    const scrollToptimer = setInterval(() => {
      let height = app.scrollHeight
      let top = app.scrollTop
      const speed = Math.max(Math.ceil(height - top - app.clientHeight), 20) / 4
      if (app.scrollTop < app.scrollHeight) {
        app.scrollTop += speed
      }
      if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
        clearInterval(scrollToptimer)
      }
    }, 30)
  }

  const handleClickMainBox = () => {
    const con = document.getElementById('tool-box-con')!
    if (!isVisible) {
      setIsVisible(true)
      con.classList.add('show-box')
      con.classList.remove('hide-box')
    } else {
      con.classList.add('hide-box')
      con.classList.remove('show-box')
      setTimeout(() => {
        setIsVisible(false)
      }, 490)
    }
  }

  return (
    <div id="tool-box-wrapper">
      <div id="tool-box-con" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <div className="tool-box move-tool-box" onClick={handleGoTop}>
          <ArrowUpOutlined />
        </div>
        {/* todo: add menu func */}
        <div className="tool-box move-tool-box" style={{ display: hasMenuIcon ? 'block' : 'none' }}>
          <UnorderedListOutlined />
        </div>
        <div className="tool-box move-tool-box" onClick={handleGoBottom}>
          <ArrowDownOutlined/>
        </div>
      </div>
      <div className="tool-box" onClick={handleClickMainBox}>
        {pagePercentage}
      </div>
    </div>
  );
};

ToolBox.defaultProps = {
  hasMenuIcon: false
}

export default ToolBox;
