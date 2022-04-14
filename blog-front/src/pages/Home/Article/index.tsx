import React from 'react';
import { Card } from 'antd';
import './index.less';

const { Meta } = Card;

const Article:React.FC = () => {
  return (
    <div className="article">
      <Card
        cover={
          <div className="article-cover-con">
            <div
              className="article-cover"
              style={{ background: `url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png) no-repeat center` }}
            />
          </div>
        }
      >
        <Meta
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  );
};

export default Article;
