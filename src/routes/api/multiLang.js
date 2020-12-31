import express from 'express';

const router = express.Router();

router.get("/", function(req, res) {
    // current language
    var currentLng = req.locale;
   
    // access i18n
    var i18n = req.i18n;
   
    // translate
    var translation = i18n.t("my.key");
    res.send(translation);
});

export default router;