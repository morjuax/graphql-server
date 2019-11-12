query getSingleCourse($courseID : Int!){
    course(id: $courseID){
        id
        title
        author
        url
        topic
    }
}


query getCourses($topic : String!){
    courses(topic: $topic){
        id
        title
        author
        url,
            topic
    }
}

query getCoursesWithFragments($courseID1: Int!, $courseID2: Int!){
    course1: course(id: $courseID1){
    ...courseFields
    }
    course2: course(id: $courseID2){
    ...courseFields
    }
}

# Update
mutation updateCourseTopic($id: Int!,$topic: String!){
    updateCourseTopic(id: $id, topic: $topic){
    ...courseFields
    }
}

fragment courseFields on Course{
    id
    title
    author
    description
    topic
    url
}