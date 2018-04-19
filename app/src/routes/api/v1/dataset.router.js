const Router = require('koa-router');

const router = new Router({
    prefix: '/loadtest',
});

class LoadTestRouter {

    static ping(ctx) {
        ctx.body = { response: 'OK' };
    }

}

router.get('/', LoadTestRouter.ping);

module.exports = router;
