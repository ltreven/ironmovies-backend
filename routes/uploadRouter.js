const express = require('express');
const authenticate = require('../authenticate');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/')
.all((req, res, next) => {
    logger.info('Routing uploads/');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post(authenticate.verifyUser, async (req, res, next) => {
    logger.info('Uploading Movie image');

    if(!req.files) {
        res.json({
            status: false,
            message: 'Files were not specified.'
        });
    } else {
        try {
            let posterImage = req.files.posterImage;
        
            //indicate directory
            posterImage.mv('./public/img/' + posterImage.name);
    
            //send response
            res.json({
                status: true,
                message: 'File uploaded successfully',
                data: {
                    name: posterImage.name,
                    mimetype: posterImage.mimetype,
                    size: posterImage.size
                }
            });    
        } catch (err) {
            next(err);
        }
    }
});


module.exports = router;