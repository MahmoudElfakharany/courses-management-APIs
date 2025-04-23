const course = require('../models/course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await course.find();
    if(!courses.length) return res.status(404).json({ message: 'No courses added' });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error:err });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error',error:err  });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, startDate, endDate, price } = req.body;
  if (!title || !description || !price)
    return res.status(400).json({ message: 'Title, description, and price are required' });

  const imagePath = req.file ? req.file.path : undefined;

  try {
    const newCourse = new course({ title, description, image:imagePath, startDate, endDate, price });
    await newCourse.save();
    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (err) {
    res.status(500).json({ message: 'Server error',error:err });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.path;

    const course = await course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course updated', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error',error:err  });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error',error:err  });
  }
};
