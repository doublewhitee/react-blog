import express from 'express';
import router from './routes/index.js';
import config from 'config';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { expressjwt } from 'express-jwt';

import './mongoDB/db.js';

const app = express()

// 跨域
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// jwt中间件
app.use(
  expressjwt({
    secret: config.jwt_key,
    algorithms: ["HS256"],
    credentialsRequired: false // 允许无token
  }).unless({
    path: ['/user/login']
  })
)
// 捕获jwt解析错误
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token')
  }
})

router(app)

app.server = app.listen(config.port, () => {
  console.log(`server running @ http://${ config.host }:${ config.port }`)
})
