'use strict';

class collect_controller {
  async getArticleList(req, res, next) {
    try {
      // No authorization token was found
      let isAuth = true
      if (!req.headers.authorization) {
        isAuth = false
      }
      res.send({ status: 1, data: [{ id: 1, title: 'aaa' }] })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new collect_controller()