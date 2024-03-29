import React, { useEffect, Fragment } from 'react';
import 'nprogress/nprogress.css';

const nprogress = require('nprogress');

const NProgress: React.FC = () => {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])
  return (
    <Fragment />
  );
};

export default NProgress;