import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import "./style.css";

const Form: React.FC = () => {
    const [priority1, setPriority1] = useState<string>('Length of the course taken');
    const [priority2, setPriority2] = useState<string>('Length of the course taken');
    const [nineCredit, setNineCredit] = useState<string>('yes');
    const [workExperience, setWorkExperience] = useState<string>('yes');
    const [timeToFinish, setTimeToFinish] = useState<string>('1 year or less');
    const [careerGoal, setCareerGoal] = useState<string>('Computer Science Career');
    const [planForUni, setPlanForUni] = useState<string>('yes');
    const results = () => {
        // Implement your results logic here
    };

    const sendMail = () => {
        // Implement your sendMail logic here
    };

    return (
        <div className="container py-5">
            <div className="row">
                <p className="paragraph_description">At Lake Washington Institute of Technology, we offer diverse pathways for
                    students to embark on their journey towards a career as either a software developer or a software engineer.</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="p-4 bg-light custom-container">
                        <h3>
                            Computing and Software Development, BAS
                            <br />
                            <br />
                            Computing and Software Development, AAS-T
                            <br />
                            <br />
                            Certificates
                        </h3>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-4 bg-light custom-container">
                        <h3>
                            <br />
                            <br />
                            Computer Science DTA/MRP
                            <br />
                            <br />
                            Computer Science, BS
                        </h3>
                    </div>
                </div>
            </div>
            <div className="row py-5">
                <p className="paragraph_description">
                    Share your academic background and goals. By answering the following questions, you allow us to better understand your unique <br /> situation, enabling us to guide you toward the right educational journey for you.
                    <br />
                </p>
            </div>
            <div className="row">
                <div className="col-6">
                    <p className="question-head">What are your priorities?</p>
                </div>
                <div className="col-6"></div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Priority 1</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="priority1" value={priority1} onChange={(e) => setPriority1(e.target.value)}>
                        <option value="Length of the course taken">Length of the course taken</option>
                        <option value="One of the CSD careers">One of the CSD careers</option>
                        <option value="Transfer to University">Transfer to University</option>
                        <option value="Expand upon education (already have credits)">Expand upon education (already have credits)</option>
                        <option value="Expand upon education (already have work experience in CSD)">
                            Expand upon education (already have work experience in CSD)
                        </option>
                    </select>
                </div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Priority 2</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="priority2" value={priority2} onChange={(e) => setPriority2(e.target.value)}>
                        <option value="Length of the course taken">Length of the course taken</option>
                        <option value="One of the CSD careers">One of the CSD careers</option>
                        <option value="Transfer to University">Transfer to University</option>
                        <option value="Expand upon education (already have credits)">Expand upon education (already have credits)</option>
                        <option value="Expand upon education (already have work experience in CSD)">
                            Expand upon education (already have work experience in CSD)
                        </option>
                        <option value="No other priorities for class searching">No other priorities for class searching</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <p className="question-head">What is your background?</p>
                </div>
                <div className="col-6"></div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Do you have 90 credits?</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="NineCredit" value={nineCredit} onChange={(e) => setNineCredit(e.target.value)}>
                        <option value="yes">yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Do you have prior work experience in tech?</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="workEXP" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)}>
                        <option value="yes">yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Desired time to finish?</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="timeToFinish" value={timeToFinish} onChange={(e) => setTimeToFinish(e.target.value)}>
                        <option value="1 year or less">1 year or less</option>
                        <option value="2 years">2 years</option>
                        <option value="Over 2 years">Over 2 years</option>
                    </select>
                </div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Career goal</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="careerGoal" value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)}>
                        <option value="Computer Science Career">Computer Science Career</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Web Development">Web Development</option>
                    </select>
                </div>
            </div>
            <div className="row custom-row">
                <div className="col-md-4 text-center">
                    <p className="question-choice">Do you want to transfer to University after finishing the program?</p>
                </div>
                <div className="col-md-8">
                    <select className="form-select" id="planForUni" value={planForUni} onChange={(e) => setPlanForUni(e.target.value)}>
                        <option value="yes">yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center">
                <button id="submit" onClick={results}>
                    submit
                </button>
            </div>
            <div className="row custom-recommend-program">
                <p className="paragraph_description">Our recommended program(s) based on your answers above</p>
                <div className="container custom-option">
                    <p className="paragraph_description">Option 1</p>
                    <p className="paragraph_description">Recommend degree: <span id="recommendedDegree">...</span><br />
                        <a href="https://catalog.lwtech.edu/content.php?catoid=15&navoid=825"><span id="link"></span></a>
                    </p>
                    <br />
                    <p className="paragraph_description">Other options: <span id="otherOption1">...</span> <span id="otherOption2"></span></p>
                    <br />
                </div>
                <p className="paragraph_description">We are more than happy to talk to you if you have further questions. Please contact our admission coach</p>
                <div className="container">
                    <textarea id="myText"></textarea><br />
                    <button id="sendEmail" onClick={() => { sendMail(); return false; }}>Email Admission Coach</button>
                </div>
            </div>
        </div>
    );
};

export default Form;

