const Koa = require('koa');
const logger = require('logger');
const config = require('config');
const loader = require('loader');
const ctRegisterMicroservice = require('ct-register-microservice-node');

const app = new Koa();

loader.loadRoutes(app);

app.listen(process.env.PORT, () => {
    ctRegisterMicroservice.register({
        info: require('../microservice/register.json'),
        swagger: require('../microservice/public-swagger.json'),
        mode: (process.env.CT_REGISTER_MODE && process.env.CT_REGISTER_MODE === 'auto') ? ctRegisterMicroservice.MODE_AUTOREGISTER : ctRegisterMicroservice.MODE_NORMAL,
        framework: ctRegisterMicroservice.KOA2,
        app,
        logger,
        name: config.get('service.name'),
        ctUrl: process.env.CT_URL,
        url: process.env.LOCAL_URL,
        token: process.env.CT_TOKEN,
        active: true
    }).then(() => {}, (error) => {
        logger.error(error);
        process.exit(1);
    });
});
logger.info('Server started in ', process.env.PORT);
