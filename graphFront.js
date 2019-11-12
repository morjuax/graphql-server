//GET COURSE
query getSingleCourse($courseID : Int!){
    course(id: $courseID){
        title
        author
        url
    }
}