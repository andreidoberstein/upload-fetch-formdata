const router = require('express').Router();
const upload = require('../config/multer');
const maxUpload = 3;

const { uploadSingleFile, uploadMultipleFiles} = require('../controller/uploadController');

router.post('/single/upload', upload.single('file'), uploadSingleFile);
router.post('/multiple/uploads', upload.array('files', maxUpload), uploadMultipleFiles);

module.exports = router;