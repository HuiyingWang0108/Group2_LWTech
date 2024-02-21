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
  // Function to handle click on program header
  const handleProgramClick = (degreeId: number): void => {
    if (selectedDegree === degreeId) {
      setShowCollapse(!showCollapse); // Toggle the collapse visibility if clicking the same degree again
    } else {
      setSelectedDegree(degreeId); // Set the selected degree
      setShowCollapse(true); // Show the collapse
    }
  };
  // const handleProgramClick = (degreeId: number): JSX.Element | void => {
  //   setShowCollapse(!showCollapse); // Toggle the collapse state
  //   console.log("test handleProgramClick")
  //   const program = degrees.find((degree) => degree.degreeId === degreeId);
  //   console.log(program)
  //   if (!program) {
  //     return; // Program not found
  //   }

  //   const quarter0 = program.quarters.find((quarter) => quarter.quarter === 0);
  //   console.log(quarter0)
  //   if (quarter0) {
  //     // If the program has quarter 0, list all the quarter 0 classes as prerequisites
  //     const quarter0ClassNames = quarter0.classes.map((classItem) => findClassNameById(classItem.classId) || 'Class not found');
  //     console.log(quarter0ClassNames)
  //     return (
  //       <Collapse in={true}>
  //         <div className="collapse">
  //           <h3>Prerequisites for {program.degreeName}:</h3>
  //           <ul>
  //             {quarter0ClassNames.map((className, index) => (
  //               <li key={index}>{className}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       </Collapse>
  //     );
  //   } else {
  //     // If the program doesn't have quarter 0, unlock all classes in the program
  //     // const allClasses = program.quarters.flatMap((quarter) => quarter.classes.map((classItem) => classItem.classId));
  //     // setUnlockedClasses(allClasses);
  //     return (
  //       <div>
  //         <p>No quarter 0 classes found for {program.degreeName}.</p>
  //       </div>
  //     );
  //   }
  // }



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
                <th key={degree.degreeId}>
                  {/* Render Collapse component if the degree has quarter 0 */}
                  {degree.quarters.some((quarter) => quarter.quarter === 0) ? (
                    <div onClick={() => handleProgramClick(degree.degreeId)}>
                      {degree.degreeName}
                      <Collapse in={selectedDegree === degree.degreeId && showCollapse}>
                        <div className="collapse">
                          <h4>Prerequisites for {degree.degreeName}:</h4>
                          <ul>
                            {/* Render prerequisite classes here */}
                            {degree.quarters
                              .filter((quarter) => quarter.quarter === 0)
                              .flatMap((quarter) =>
                                quarter.classes.map((classItem) => (
                                  <li key={classItem.classId}>{findClassNameById(classItem.classId)}</li>
                                ))
                              )}
                          </ul>
                        </div>
                      </Collapse>
                    </div>
                  ) : (
                    // Render only the degree name if it doesn't have quarter 0
                    <div onClick={() => setSelectedDegree(degree.degreeId)}>
                      {degree.degreeName}
                    </div>
                  )}
                </th>
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
                        className={`text-truncate ${unlockedClasses.includes(classItem.classId)
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
