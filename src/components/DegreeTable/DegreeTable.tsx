import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IClass from '../../interfaces/IClass';
import IDegree from '../../interfaces/IDegree';
import './styles.css'; // Import CSS file for styling

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
    const classItem = classes.find((item) => item.classId === classId);
    if (!classItem) {
      return false;
    }

    const prerequisites = classItem['pre-req'] || [];
    return prerequisites.every((prereqId) => unlockedClasses.includes(prereqId));
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
    const classItem = classes.find((item) => item.classId === classId);
    if (!classItem) {
      return false;
    }

    const hasPrereqs = classItem['pre-req'] && classItem['pre-req'].length > 0;
    if (!hasPrereqs) {
      return true;
    }

    const prerequisites = findPrerequisites(classId);
    return prerequisites.every((prereqId) => unlockedClasses.includes(prereqId));
  };

  const handleCellClick = (classId: number) => {
    const isAlreadyUnlocked = unlockedClasses.includes(classId);
    if (isClickable(classId)) {
      if (isAlreadyUnlocked) {
        const dependents = degrees.flatMap((degree) =>
          degree.quarters.flatMap((quarter) =>
            quarter.classes.filter((classItem) => findPrerequisites(classItem.classId).includes(classId))
          )
        );
        const dependentAlreadyUnlocked = dependents.some((classItem) =>
          unlockedClasses.includes(classItem.classId)
        );
        if (dependentAlreadyUnlocked) {
          alert('Cannot unclick this class because it is a prerequisite for other classes that are already selected.');
          return;
        }
      }
      if (isAlreadyUnlocked) {
        setUnlockedClasses((prevUnlocked) => prevUnlocked.filter((id) => id !== classId));
      } else {
        setUnlockedClasses((prevUnlocked) => [...prevUnlocked, classId]);
      }
    } else {
      const removedClasses = findPrerequisites(classId).concat(classId);
      setUnlockedClasses((prevUnlocked) => prevUnlocked.filter((id) => !removedClasses.includes(id)));
    }
    setSelectedClass(classId);
  };

  const getClassPrerequisitesText = (classId: number): string => {
    const prerequisites = findPrerequisites(classId);
    const missingPrerequisites = prerequisites.filter((prereqId) => !unlockedClasses.includes(prereqId));
    const missingPrerequisitesText = missingPrerequisites.map((prereqId) => findClassNameById(prereqId)).join(', ');
    return missingPrerequisitesText;
  };

  return (
    <div className="container mt-5">
      <h2>Degree with classes</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              {degrees.map((degree) => (
                <th key={degree.degreeId}>{degree.degreeName}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ height: '300px', overflowY: 'auto' }}>
            {[...Array(12)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {degrees.map((degree) => (
                  <td key={degree.degreeId}>
                    {degree.quarters[rowIndex]?.classes.map((classItem) => (
                      <div
                        key={classItem.classId}
                        className={`text-truncate ${
                          unlockedClasses.includes(classItem.classId)
                            ? 'bg-success text-white'
                            : isClickable(classItem.classId)
                            ? 'bg-white'
                            : 'bg-gray'
                        } hover-effect`}
                        onClick={() => handleCellClick(classItem.classId)}
                      >
                        {findClassNameById(classItem.classId) || 'Class not found'}
                        <div className="hover-window">
                          <span className="text-danger">{getClassPrerequisitesText(classItem.classId)}</span>
                        </div>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DegreeTable;
