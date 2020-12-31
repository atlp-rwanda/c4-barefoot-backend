import express from 'express';
import i18n from 'i18next';

i18n.init();

const app = express();

// Configuration block of express app
app.use(i18n.handle);
app.use(app.router);


i18n.init({
    ignoreRoutes: ['images/', 'public/', 'css/', 'js/']
});