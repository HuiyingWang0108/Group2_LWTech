import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Class {
  className: string;
  classId: number;
  preReq: number[];
}

const ClassesList: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    axios.get('/data/Classes.json').then((response) => {
      setClasses(response.data);
    });
  }, []);

const renderPrerequisites = (prerequisites?: number[]) => {
  if (!prerequisites || prerequisites.length === 0) {
    return 'None';
  }

  return prerequisites.map((prereq, index) => (
    <div key={index}>{prereq}</div>
  ));
};


  return (
    <div>
      <h2>Classes List</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls.classId}>
            <strong>{cls.className}</strong>
            <p>Class ID: {cls.classId}</p>
            <p>Prerequisites: {renderPrerequisites(cls.preReq)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesList;
