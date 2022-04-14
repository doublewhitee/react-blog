import React from 'react';

import Article from './Article';

const a = [1,2,3,4,5,6]

const Home: React.FC = () => {
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
