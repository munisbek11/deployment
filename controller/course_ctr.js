const {read_file, write_file} = require("../Api/api")
const {v4} = require("uuid")

const getCourse = async (req,res, next)=>{
  try{
    const course = read_file("course.json")
    res.send(course)
  }catch(err){
    return next(err.message)
  }
}

const addCourse = async (req, res,next) => {
  try {
    const { title, price, duration, teacher } = req.body;
    const course = read_file("course.json");
    course.push({
      id: v4(),
     title,
     teacher, 
     duration,
     price
    });
    write_file("course.json", course);
    res.send({
      message: "Added course",
    });
  } catch (err) {
   return next(err.message);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { title, price, duration, teacher } = req.body;
    const course = read_file("course.json");
    const { id } = req.params;

    const foundedcourse = course.find((item) => item.id === id);

    if (!foundedcourse) {
      return res.send({
        message: "Course not found",
      });
    }

    course.forEach((item) => {
      if (item.id === id) {
        item.title = title ? title : item.title;
        item.price = price ? price : item.price;
        item.teacher = teacher ? teacher : item.teacher;
        item.duration = duration ? duration : item.duration;
      }
    });
    write_file("course.json", course);
    res.send({
      message: "The course successfully updated",
    });
  } catch (err) {
    return next(err.message)
  }
};

const get_one = async (req, res, next) => {
  try {
    const course = read_file("course.json");
    const { id } = req.params;

    const foundedcourse = course.find((item) => item.id === id);

    if (!foundedcourse) {
      return res.send({
        message: "Course not found",
      });
    }
    res.send(foundedcourse);
  } catch (err) {
    return next(err.message)
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = read_file("course.json");
    const { id } = req.params;

    const foundedcourse = course.find((item) => item.id === id);

    if (!foundedcourse) {
      return res.send({
        message: "Course not found",
      });
    }

    course.forEach((item, idx) => {
      if (item.id === id) {
        course.splice(idx, 1);
      }
    });
    write_file("course.json", course);
    res.send({
      message: "The course successfully deleted",
    });
  } catch (err) {
    return next(err.message)
  }
};

const git = (req,res, next)=>{
  try{
    res.send({message: "Server is running!"})
  }catch(err){
    return next(err.message)
  }
}

module.exports = {
  getCourse, 
  addCourse,
  get_one,
  updateCourse, 
  deleteCourse, git
}