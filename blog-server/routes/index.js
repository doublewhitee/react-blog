'use strict';

import user from './user.js';
import collect from './collect.js';
import admin from './admin.js';

export default app => {
  app.use('/user', user)
  app.use('/collect', collect)
  app.use('/admin', admin)
}
