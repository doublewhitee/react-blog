import React, { useEffect } from 'react';

import Article from './Components/Article';

import { useAppSelector } from '@redux/hooks';
import { reqArticleList } from '@api/collect';

const a = [1,2,3,4,5,6]

const Home: React.FC = () => {
  const isLogin = useAppSelector(state => state.user.isLogin)

  useEffect(() => {
    reqArticleList().then(r => console.log(r))
  }, [isLogin])

  return (
    <div>
      {
        a.map(i => (
          <Article key={i} />
        ))
      }
    </div>
  );
};

export default Home;
