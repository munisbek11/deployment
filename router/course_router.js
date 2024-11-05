const {Router} = require("express")
const { getCourse, get_one, addCourse, updateCourse, deleteCourse, git } = require("../controller/course_ctr")
const {checkAdmin, checkUser} = require("../middleware/auth")

const courseRouter = Router()

courseRouter.get("/get_course", getCourse)
courseRouter.get("/get_one/:id", checkUser, get_one)
courseRouter.post("/add_course",checkAdmin, addCourse)
courseRouter.put("/update_course/:id",checkAdmin, updateCourse)
courseRouter.delete("/delete_course/:id",checkAdmin, deleteCourse)
courseRouter.get("/", git)

module.exports = courseRouter