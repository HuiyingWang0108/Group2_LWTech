import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IClass from '../../interfaces/IClass';
import IDegree from '../../interfaces/IDegree';

const DegreeTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [degrees, setDegrees] = useState<IDegree[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesResponse = await axios.get('/data/Classes.json');
        setClasses(classesResponse.data);
      } catch (error) {
        setError('Error fetching classes data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const degreesResponse = await axios.get('/data/Degrees.json');
        setDegrees(degreesResponse.data);
      } catch (error) {
        setError('Error fetching degrees data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Degree with classes</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              {/* Loop through degrees to create table headers */}
              {degrees.map(degree => (
                <th key={degree.degreeId}>{degree.degreeName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ height: '300px', overflowY: 'auto' }}>
            {/* Loop through rows to create table body */}
            {[...Array(12)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {/* Loop through degrees to create table cells */}
              </tr>
            ))}
            

          </tbody>
        </table>
      </div>
    </div>);
};

export default DegreeTable;
