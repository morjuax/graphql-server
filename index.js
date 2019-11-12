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
    
    type Course {
        id: Int
        title: String
        author: String
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


const root = {
    course: getCourse,
    courses: getCourses
};

app.use('/graphql', express_graphql({
        schema,
        rootValue: root,
        graphiql: true
    })
);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server on port ', port));