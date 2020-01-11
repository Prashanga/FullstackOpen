import React from 'react';

const Header = (props) => (<h1>{props.header}</h1>);

const Content = ({parts}) =>(
  parts.map((part)=>(<p key={part.id}>{part.name}  {part.exercises}</p>))
  );

  const Total = ({parts}) => {
    let total = parts.reduce((sum,part)=>sum+part.exercises,0);
    return(
        <strong>total of {total} exercises </strong>
    )
  
  }

const Course = ({courses}) => {
   
    return(
        courses.map((course)=>
            <div key={course.id}>
            <Header header={course.name}/>
            
            <Content parts={course.parts} />
            <Total  parts={course.parts} />
            </div>
        )
    );
}

export default Course;
