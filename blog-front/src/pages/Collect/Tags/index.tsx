import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setRoute } from '../../../redux/reducers/userSlice';
import { defaultRoutes } from '../../../config/router';

const Tags: React.FC = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  return (
    <div>
      <p>{user.isLogin}</p>
    </div>
  );
};

export default Tags;