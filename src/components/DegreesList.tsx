import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Degree {
  degreeId: number;
  degreeName: string;
  quarters: {
    quarter: number;
    classes: { classId: number; sub: number[] }[];
  }[];
}

const DegreesList: React.FC = () => {
  const [degrees, setDegrees] = useState<Degree[]>([]);

  useEffect(() => {
    axios.get('/data/Degrees.json').then((response) => {
      setDegrees(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Degrees List</h2>
      <ul>
        {degrees.map((degree) => (
          <li key={degree.degreeId}>
            <strong>{degree.degreeName}</strong>
            <ul>
              {degree.quarters.map((quarter) => (
                <li key={quarter.quarter}>
                  <p>Quarter: {quarter.quarter}</p>
                  <ul>
                    {quarter.classes.map((cls) => (
                      <li key={cls.classId}>
                        <p>Class ID: {cls.classId}</p>
                        <p>Sub: {cls.sub.join(', ')}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DegreesList;
