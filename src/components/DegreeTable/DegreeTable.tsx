import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IClass from '../../interfaces/IClass';
import IDegree from '../../interfaces/IDegree';

const DegreeTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [degrees, setDegrees] = useState<IDegree[]>([]);

  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [unlockedClasses, setUnlockedClasses] = useState<number[]>([]);

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

  const findClassNameById = (classId: number): string | undefined => {
    const foundClass = classes.find((classItem) => classItem.classId === classId);
    return foundClass?.className;
  };
  const hasPrerequisites = (classId: number): boolean => {
    // Helper function to check if a class has prerequisites
    const classItem = classes.find((item) => item.classId === classId);
    return !!classItem?.['pre-req'] && classItem?.['pre-req'].length > 0;
  };
  const findPrerequisites = (classId: number): number[] => {
    const prerequisites: number[] = [];
    const findPrereqs = (id: number) => {
      const classItem = classes.find((item) => item.classId === id);
      if (classItem && classItem['pre-req']) {
        classItem['pre-req'].forEach((prereqId) => {
          if (!prerequisites.includes(prereqId)) {
            prerequisites.push(prereqId);
            findPrereqs(prereqId);
          }
        });
      }
    };

    findPrereqs(classId);
    return prerequisites;
  };
  const isClickable = (classId: number): boolean => {
    if (hasPrerequisites(classId)) {
      const prerequisites = findPrerequisites(classId);
      return prerequisites.every((prereqId) => unlockedClasses.includes(prereqId));
    }
    return true;
  };
  const handleCellClick = (classId: number) => {
    const prerequisites = findPrerequisites(classId);
    setUnlockedClasses((prevUnlocked) => {
      // Add clicked class and its prerequisites to the unlocked classes
      const newUnlocked = Array.from(new Set([...prevUnlocked, classId, ...prerequisites]));
      return newUnlocked;
    });
    setSelectedClass(classId);
  };
  // const handleCellClick = (classId: number) => {
  //   if (isClickable(classId)) {
  //     if (unlockedClasses.includes(classId)) {
  //       // If the class is already unlocked, clicking it again will deselect it
  //       setUnlockedClasses([]);
  //     } else {
  //       // Find prerequisites and set unlocked classes
  //       const prerequisites = findPrerequisites(classId);
  //       setUnlockedClasses([classId, ...prerequisites]);
  //       setSelectedClass(classId);
  //     }
  //   }
  // };
  
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
            {/* Loop through quarters to create table body */}
            {[...Array(12)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {/* Loop through degrees to create table cells */}
                {degrees.map((degree) => (
                  <td key={degree.degreeId}>
                    {/* Display classes for the corresponding degree and quarter */}
                    {degree.quarters[rowIndex]?.classes.map((classItem) => (
                      <div 
                      key={classItem.classId}
                        className={`text-truncate ${
                          unlockedClasses.includes(classItem.classId)
                            ? 'bg-success text-white'
                            : hasPrerequisites(classItem.classId)
                            ? isClickable(classItem.classId)
                              ? 'bg-white'
                              : 'bg-gray'
                            : 'bg-gray'
                        }`}
                        onClick={() => handleCellClick(classItem.classId)}
                      >
                        {findClassNameById(classItem.classId) || 'Class not found'}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>);
};

export default DegreeTable;
