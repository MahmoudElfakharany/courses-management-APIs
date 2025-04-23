const express = require('express');
const router = express.Router();
const courseController = require('../controllers/controllers');
const upload = require('../middlewares/upload');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/',upload.single('image'), courseController.createCourse);
router.put('/:id',upload.single('image'), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
