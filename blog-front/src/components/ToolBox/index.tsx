import React, { useEffect, useState } from 'react';
import { ArrowUpOutlined, UnorderedListOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import './index.less';

interface ToolBoxProps {
  hasMenuIcon?: boolean
}

const ToolBox: React.FC<ToolBoxProps> = props => {
  const { hasMenuIcon } = props

  const location = useLocation()

  const [pagePercentage, setPagePercentage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollTimer, setScrollTimer] = useState<NodeJS.Timer>()
  const [scrollDirection, setScrollDirection] = useState<'none' | 'top' | 'bottom'>('none')

  useEffect(() => {
    const app = document.getElementById('app-content')!
    app.addEventListener('scroll', handleScroll)
    return () => {
      app.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 切换页面，重置页面进度至页面顶端
  useEffect(() => {
    const app = document.getElementById('app-content')!
    setScrollDirection('none')
    app.scrollTop = 0
  }, [location])

  useEffect(() => {
    const app = document.getElementById('app-content')!
    // 不论在任何情况下，首先清空定时器
    clearInterval(scrollTimer)
    if (scrollDirection === 'top') {
      // 回到顶部
      const scrollToptimer = setInterval(() => {
        let top = app.scrollTop
        var speed = top / 4
        if (app.scrollTop !== 0) {
          app.scrollTop -= speed
        }
        if (top === 0) {
          setScrollDirection('none')
        }
      }, 30)
      setScrollTimer(scrollToptimer)
    } else if (scrollDirection === 'bottom') {
      // 回到底部
      const scrollBottomtimer = setInterval(() => {
        let height = app.scrollHeight
        let top = app.scrollTop
        const speed = Math.max(Math.ceil(height - top - app.clientHeight), 20) / 4
        if (Math.ceil(app.scrollTop + app.clientHeight) !== app.scrollHeight) {
          app.scrollTop += speed
        }
        if (Math.ceil(app.scrollTop + app.clientHeight) >= app.scrollHeight) {
          setScrollDirection('none')
        }
      }, 30)
      setScrollTimer(scrollBottomtimer)
    }
  }, [scrollDirection])

  const handleScroll = (e: Event) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLElement
    setPagePercentage(clientHeight === scrollHeight ? 0 : Math.ceil(scrollTop / (scrollHeight - clientHeight) * 100))
  }

  const handleGoTop = () => {
    setScrollDirection('top')
  }

  const handleGoBottom = () => {
    setScrollDirection('bottom')
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
