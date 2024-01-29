import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IClass from '../../interfaces/IClass';
import IClassWithSub from '../../interfaces/IClassWithSub';
import IDegree from '../../interfaces/IDegree';
import IQuarter from '../../interfaces/IQuarter';

const Degree: React.FC = () => {
  
  const [classes, setClasses] = useState<IClass[]>([]);
  const [classWithSub, setClassWithSub] = useState<IClassWithSub[]>([]);
  const [quarters, setQuarters] = useState<IQuarter[]>([]);
  const [degrees, setDegrees] = useState<IDegree[]>([]);

  useEffect(() => {
    axios.get('/data/Classes.json').then((response) => {
      setClasses(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/data/Degrees.json').then((response) => {
        setDegrees(response.data);
    });
  }, []);


  // Function to map class IDs to class names
  const getClassName = (classId: number) => {
    const foundClass = classes.find((c) => c.classId === classId);
    return foundClass ? foundClass.className : 'Class not found';
  };

  return (
    <div>
      <h1>Degree Table</h1>
      <table>
        <thead>
          <tr>
            <th>Degree Name</th>
            {/* Add quarter headers dynamically based on the number of quarters */}
            {degrees.length > 0 &&
              degrees[0].quarters.map((quarter, index) => (
                <th key={index}>IQuater{quarter.quarter}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Map through degrees to create rows */}
          {degrees.map((degree) => (
            <tr key={degree.degreeId}>
              <td>{degree.degreeName}</td>
              {/* Map through quarters to create cells */}
              {degree.quarters.map((quarter) => (
                <td key={quarter.quarter}>
                  {/* Map through classes in each quarter to display class names */}
                  {quarter.classes.map((course) => (
                    <div key={course.classId}>
                      {getClassName(course.classId)}
                      {/* Display sub-classes if any */}
                      {course.sub && course.sub.length > 0 && (
                        <ul>
                          {course.sub.map((subClass) => (
                            <li key={subClass}>{getClassName(subClass)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Degree;
