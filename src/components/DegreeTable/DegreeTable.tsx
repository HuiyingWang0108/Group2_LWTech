import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
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
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);
  const [showCollapse, setShowCollapse] = useState(false); // State to control collapse visibility

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

  const isClickable = (classId: number, quarter: number, degreeId: number): boolean => {
    // Check if the degree has quarter 0
    const degree = degrees.find((degree) => degree.degreeId === degreeId);
    const degreeHasQuarter0 = degree?.quarters.some((q) => q.quarter === 0);

    // If the degree has quarter 0 and the current quarter is not 0, check if all quarter 0 classes are unlocked
    if (degreeHasQuarter0 && quarter !== 0) {
      const quarter0Classes = degree?.quarters.find((q) => q.quarter === 0)?.classes;
      const allQuarter0ClassesUnlocked = quarter0Classes?.every((c) => unlockedClasses.includes(c.classId)) ?? false;
      if (allQuarter0ClassesUnlocked) {
        const prerequisites = findPrerequisites(classId);
        return prerequisites.every((prereqId) => unlockedClasses.includes(prereqId));
        // If all quarter 0 classes are unlocked, treat as normal clickable which depends on the class whether it has prerequisites
      } else {
        return false; // If not all quarter 0 classes are unlocked, lock the cells
      }
    }

    // Rest of the logic for determining if the cell is clickable
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


  const handleProgramClick = (degreeId: number): void => {
    if (selectedDegree === degreeId) {
      setShowCollapse(!showCollapse);
    } else {
      setSelectedDegree(degreeId);
      setShowCollapse(true);
    }
  };

  // const handleCellClick = (classId: number, quarter: number, degreeId: number) => {
  //   const isAlreadyUnlocked = unlockedClasses.includes(classId);
  //   if (isClickable(classId, quarter, degreeId)) {
  //     if (isAlreadyUnlocked) {
  //       const dependents = degrees.flatMap((degree) =>
  //         degree.quarters.flatMap((q) =>
  //           q.classes.filter((c) => findPrerequisites(c.classId).includes(classId))
  //         )
  //       );
  //       const dependentAlreadyUnlocked = dependents.some((c) =>
  //         unlockedClasses.includes(c.classId)
  //       );
  //       if (dependentAlreadyUnlocked) {
          // alert('Cannot unclick this class because it is a prerequisite for other classes that are already selected.');
          // return;
  //       }
  //     }
  //     if (isAlreadyUnlocked) {
  //       setUnlockedClasses((prevUnlocked) => prevUnlocked.filter((id) => id !== classId));
  //     } else {
  //       setUnlockedClasses((prevUnlocked) => [...prevUnlocked, classId]);
  //     }
  //   } else {
  //     const removedClasses = findPrerequisites(classId).concat(classId);
  //     setUnlockedClasses((prevUnlocked) => prevUnlocked.filter((id) => !removedClasses.includes(id)));
  //   }
  //   setSelectedClass(classId);
  // };
  const handleCellClick = (classId: number, quarter: number, degreeId: number) => {
    const isAlreadyUnlocked = unlockedClasses.includes(classId);
    if (isClickable(classId, quarter, degreeId)) {
      if (isAlreadyUnlocked) {
        const dependents = degrees.flatMap((degree) =>
          degree.quarters.flatMap((q) =>
            q.classes.filter((c) => findPrerequisites(c.classId).includes(classId))
          )
        );
        const dependentIds = dependents.map((c) => c.classId);
        const dependentAlreadyUnlocked = dependentIds.some((id) =>
          unlockedClasses.includes(id)
        );
        if (dependentAlreadyUnlocked) {
          const removedClasses = dependentIds.concat(classId);
          setUnlockedClasses((prevUnlocked) => prevUnlocked.filter((id) => !removedClasses.includes(id)));
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
                <th key={degree.degreeId}>
                  {degree.quarters.some((q) => q.quarter === 0) ? (
                    <div onClick={() => handleProgramClick(degree.degreeId)}>
                      {degree.degreeName}
                      <Collapse in={selectedDegree === degree.degreeId && showCollapse}>
                        <div className="collapse">
                          <ul>
                            {degree.quarters
                              .filter((q) => q.quarter === 0)
                              .flatMap((q) =>
                                q.classes.map((c) => (
                                  <li key={c.classId}>{findClassNameById(c.classId)}</li>
                                ))
                              )}
                          </ul>
                        </div>
                      </Collapse>
                    </div>
                  ) : (
                    <div onClick={() => setSelectedDegree(degree.degreeId)}>
                      {degree.degreeName}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ height: '300px', overflowY: 'auto' }}>
            {[...Array(13)].map((_, quarterIndex) => (
              <tr key={quarterIndex}>
                <td>{quarterIndex === 0 ? 'Prerequisites:' : `Quarter ${quarterIndex}`}</td>
                {degrees.map((degree) => (
                  <td key={`${degree.degreeId}-${quarterIndex}`}>
                    {degree.quarters.find((q) => q.quarter === quarterIndex)?.classes ? (
                      degree.quarters.find((q) => q.quarter === quarterIndex)?.classes.map((c) => (
                        <div
                          key={c.classId}
                          className={`text-truncate ${unlockedClasses.includes(c.classId)
                            ? 'bg-success text-white'
                            : isClickable(c.classId, quarterIndex, degree.degreeId)
                              ? 'bg-white'
                              : 'bg-gray'
                            } hover-effect`}
                          onClick={() => handleCellClick(c.classId, quarterIndex, degree.degreeId)}
                        >
                          {findClassNameById(c.classId) || 'Class not found'}
                          <div className="hover-window">
                            <span className="text-danger">{getClassPrerequisitesText(c.classId)}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-truncate"></div>
                    )}
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
