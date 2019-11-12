const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');

//data
const {courses} = require('./data.json');

const schema = buildSchema(`
    type Query {
        course(id:Int!): Course
        courses(topic: String): [Course]
    }
    
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

let getCourse = (args) => courses.find(course => course.id === args.id);

let getCourses = (args) => {
    if (args.topic) {
        let topic = args.topic;
        return courses.filter(course => course.topic === topic);
    }
    return courses;
};

let updateCourseTopic = ({id, topic}) => {
    courses.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return courses.find(course => course.id === id);
};


const root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic
};

app.use('/graphql', express_graphql({
        schema,
        rootValue: root,
        graphiql: true
    })
);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server on port ', port));