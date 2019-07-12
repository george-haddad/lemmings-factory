const Router = require('koa-router');

const router = new Router();

router.get('/ready', async ctx => {
  ctx.response.status = 200;
  ctx.body = {
    message: 'OK',
  };
});

module.exports = router;