var priority1;
var priority2;
var NinetyCredit;
var workEXP;
var timeToFinish;
var careerGoal;
var planForUni;

function results() {
    NinetyCredit = document.getElementById("NineCredit").value;
    previousWork = document.getElementById("workEXP").value;
    timeGoal = document.getElementById("timeToFinish").value;
    careerPlan = document.getElementById("careerGoal").value;
    university = document.getElementById("planForUni").value;
    //Priority 1
    priority1 = document.getElementById("priority1").value;
    switch (priority1) {
        case "Length of the course taken":
            if (timeGoal == "1 year or less") {
                document.getElementById("recommendedDegree").innerHTML = "Certificates";
                document.getElementById("link").innerHTML = "Link";
            }
            else if (timeGoal == "2 years") {
                if (NinetyCredit == "yes") {
                    document.getElementById("recommendedDegree").innerHTML = "Computing and Software Development, BAS"
                    document.getElementById("link").innerHTML = "Link";
                }
                else {
                    document.getElementById("recommendedDegree").innerHTML = "Computing and Software Development, AAS-T";
                    document.getElementById("link").innerHTML = "Link";
                }
            }
            else {
                document.getElementById("recommendedDegree").innerHTML = "Computer Science DTA/MRP" + ", " + "Computer Science, BS";
                document.getElementById("link").innerHTML = "Link";
            }
            break;
        case "One of the CSD careers":
            if (careerPlan == "Computer Science Career") {
                document.getElementById("recommendedDegree").innerHTML = "Computer Science DTA/MRP" + ", " + "Computer Science, BS";
                document.getElementById("link").innerHTML = "Link";
            }
            else if (careerPlan == "Software Developer") {
                document.getElementById("recommendedDegree").innerHTML = "Computing and Software Development, BAS" + ", " + "Computing and Software Development, AAS-T";
                document.getElementById("link").innerHTML = "Link";
            }
            else {
                document.getElementById("recommendedDegree").innerHTML = "Certificates";
                document.getElementById("link").innerHTML = "Link";
            }
            break;
        case "Transfer to University":
            if (university == "yes") {
                document.getElementById("recommendedDegree").innerHTML = "Computer Science DTA/MRP" + ", " + "Computing and Software Development, AAS-T";
                document.getElementById("link").innerHTML = "Link";
            }
            else {
                document.getElementById("recommendedDegree").innerHTML = "Computing and Software Development, BAS" + ", " + "Computer Science, BS";
                document.getElementById("link").innerHTML = "Link";
            }
            break;
        case "Expand upon education (already have credits)":
            if (NinetyCredit == "yes") {
                document.getElementById("recommendedDegree").innerHTML = "Computing and Software Development, BAS";
                document.getElementById("link").innerHTML = "Link";
            }
            else {
                document.getElementById("recommendedDegree").innerHTML = "Computer Science DTA/MRP" + ", " + "Computing and Software Development, AAS-T";
                document.getElementById("link").innerHTML = "Link";
            }
            break;
        default:
            if (previousWork == "yes") {
                document.getElementById("recommendedDegree").innerHTML = "Certificates";
                document.getElementById("link").innerHTML = "Link";
            }
            else {
                document.getElementById("recommendedDegree").innerHTML = "Computer Science DTA/MRP" + ", " + "Computing and Software Development, AAS-T";
                document.getElementById("link").innerHTML = "Link";
            }
            break;




    }
    // Priority 2
    priority2 = document.getElementById("priority2").value;
    switch(priority2) {
        case "Length of the course taken":
            if (timeGoal == "1 year or less") {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Certificates")) {
                    document.getElementById("otherOption1").innerHTML = "Certificates"//+", ";
                }
            }
            else if (timeGoal == "2 years") {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Certificates")) {
                    document.getElementById("otherOption1").innerHTML = "Certificates";
                }
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, AAS-T"))
                    document.getElementById("otherOption2").innerHTML = ", Computing and Software Development, AAS-T";
            }
            else {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, BAS")) {
                    document.getElementById("otherOption1").innerHTML = "Computing and Software Development, BAS";
                }
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science DTA/MRP"))
                    document.getElementById("otherOption2").innerHTML = ", Computer Science DTA/MRP";
            }
            break;
        case "One of the CSD careers":
            if (careerPlan == "Computer Science Career") {
                if (document.getElementById("recommendedDegree").innerHTML.includes("Computer Science, BS")) {
                    document.getElementById("otherOption1").innerHTML = "Computer Science, BS";
                }
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science DTA/MRP"))
                    document.getElementById("otherOption2").innerHTML = ", Computer Science DTA/MRP";
            }
            else if (careerPlan == "Software Developer") {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, BAS"))
                    document.getElementById("otherOption1").innerHTML = "Computing and Software Development, BAS";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, AAS-T"))
                    document.getElementById("otherOption2").innerHTML = ", Computing and Software Development, AAS-T";
            }
            else {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Certificates"))
                    document.getElementById("otherOption1").innerHTML = "Certificates"//+", ";
                //document.getElementById("otherOption2").innerHTML = "Computing and Software Development, AAS-T";
            }
            break;
        case "Transfer to University":
            if (university == "yes") {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science DTA/MRP"))
                    document.getElementById("otherOption1").innerHTML = "Computer Science DTA/MRP" + ", ";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, AAS-T"))
                    document.getElementById("otherOption2").innerHTML = "Computing and Software Development, AAS-T";
            }
            else {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, BAS"))
                    document.getElementById("otherOption1").innerHTML = "Computing and Software Development, BAS" + ", ";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science, BS"))
                    document.getElementById("otherOption2").innerHTML = "Computer Science, BS";
            }
            break;
        case "Expand upon education (already have credits)":
            if (NinetyCredit == "yes") {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, BAS"))
                    document.getElementById("otherOption1").innerHTML = "Computing and Software Development, BAS" + ", ";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science, BS"))
                    document.getElementById("otherOption2").innerHTML = "Computer Science, BS" + ", " + "Certificates";
            }
            else {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, AAS-T"))
                    document.getElementById("otherOption1").innerHTML = "Computing and Software Development, AAS-T" + ", ";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science DTA/MRP"))
                    document.getElementById("otherOption2").innerHTML = "Computer Science DTA/MRP";
            }
            break;
        case "Expand upon education (already have work experience in CSD)":
            if (previousWork == "yes") {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Certificates"))
                    document.getElementById("otherOption1").innerHTML = "Certificates" + ", ";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computing and Software Development, BAS"))
                    document.getElementById("otherOption2").innerHTML = "Computing and Software Development, BAS" + ", " + "Computing and Software Development, AAS-T";
            }
            else {
                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science DTA/MRP"))
                    document.getElementById("otherOption1").innerHTML = "Computer Science DTA/MRP" + ", ";

                if (!document.getElementById("recommendedDegree").innerHTML.includes("Computer Science, BS"))
                    document.getElementById("otherOption2").innerHTML = "Computer Science, BS";
            }
            break;

    }
}

function sendMail() {
    var link = "mailto:S-Rowan.Conway@lwtech.edu"
        //  + "?cc=myCCaddress@example.com"
        + "?subject=" + encodeURIComponent("Student Help Request")
        + "&body=" + encodeURIComponent(document.getElementById('myText').value);

    window.location.href = link;
}