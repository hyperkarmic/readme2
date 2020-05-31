//we start by importing the three libraries that we need//

const fs = require("fs");
//this imports us 'file system'

const inquirer = require("inquirer");
//this imports 'inquirer'

const axios = require("axios")
//this imports 'axios'

//this is everything that needs importing for this application :) //

//Table of contents - outlining every area the application has to gather information.
const contents = `Table Of Contents

1)Project Title

2)Description

3)Installation

4)Usage

5)Contributing

6)Tests

7)Questions
a - Github User Profile Picture
b - Github User E-mail 

8)License





`



//this is an array - that contains questions! - it corresponds to the 'inquirer' question object structure.
// 'input has been used' - except for 'list' which was used for badge selection 

const questions = [
  {
    name: "username",
    message: "Please enter your GitHub username",
    type: "input",
  },{
  
    name: "title",
    message: "Please enter the title of your project",
    type: "input",
  },
  {
    name: "description",
    message: "Enter a description of your project",
    type: "input",
  },
  {
    type: "input",
    name: "install",
    message: "What command should be run to install dependencies?",
    default: "npm i"
  },
  {
    type: "input",
    name: "usage",
    message: "Provide information on application usage - screenshots can be added later!",
  
  },
  {
    name: "contributing",
    message: "Explain how users can contribute to this project.  The guidelines at Contributor Covenant - (https://www.contributor-covenant.org/) - are industry standard - but feel free to develop your own!!!",
    type: "input",
  },
  {
    type: "input",
    name: "test",
    message: "Information on writing and running tests for this application to go here",
  
  },
  {
    type: "input",
    name: "credit",
    message: "The following people take credit for their invaluable input on this project",
  
  },
  {
    type: "input",
    name: "email",
    message: "Could you please input the e-mail for the git-hub repository?",
  
  },
  {
    type: 'list',
    name: 'license',
    message: 'Which license would be most appropriate for this project',
    choices: ['Apache', 'GNU','MIT','Mozilla'],
  }
];



//this function generates project title
const genProjectTitle = (title) => {
  return `
  ##1)Title: ${title}
  `;
};


//this function generates a description
const genDescription = (description) => {
  return `
  ##2) Description:
  ${description}
  `;
};

//this function is responsible for returning installation information
const genInstallation = (install) => {
  return `
  ##3) Installation: 
  ${install}
  `;
};

//this function allows information about how to effectively use the application

const genUsage = (usage) => {
  return `
  ##4) Usage:
  ${usage}
  `;
};

//this function contains information about how to contribute to the project

const genContributing = (contributing) => {
  return `
  ##5) Contributing: 
  ${contributing}
  `;
};

//this function allows information about inputting testing information about the application

const genTest = (test) => {
  return `
  ##6) Test:
  ${test}
  `;
};




//this function generates questions
const genImage = (imageUrl) => {
  return `
  ##7a) Questions
  ![user-name](${imageUrl})
  `
}

const genEmail = (email) => {
  return `
  ##7b) Github repository e-mail:
  ${email}
  `;
};


//this function returns information about contributors to the project.
const genCredit = (credit) => {
  return `
  ##8) Credit
  ${credit}
  `;
};

//this offers a selection of licenses - using inquirers 'list' option for question objects.  I regret not putting a creative commons one in!


const genLicense = (license) => {
  return `
  ##9) License
  ${license}
  `;
};


//this function takes the data from the questions, and makes an API call to github for the github avatar picture,
//using 'axios'.  Axios then uses a 'promise' to start building the readme, if the call has been successful!

function initializer() {
  const renderQuestions = (data) => {
    const url = `https://api.github.com/users/${data.username}`
    axios.get(url).then((response) => {
      data.githubProfileUrl = response.data.avatar_url
      const readme = buildReadme(data);
      createGitReadme(readme);
    })
  };
  inquirer.prompt(questions).then(renderQuestions);
}

//this function builds the the strings to populate the read me from question data

const buildReadme = (data) => {
  const githubProfileUrl = data.githubProfileUrl;
  const title = data.title;
  const description = data.description;
  const install = data.install;
  const usage = data.usage;
  const contributing = data.contributing;
  const test = data.test;
  const credit = data.credit;
  const email = data.email;
  let license = data.license;

  // license is a let variable - as it is going to be re-written with the code for the correct badge

  
  //the below logic populates the badge into the readMe
  if (license === "MIT"){license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"}
  if (license === "Mozilla"){license = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"}
  if (license === "GNU"){license = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"}
  if (license === "Apache"){license ="[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"}
  
  //read me - gathers data to be written to readMe file and returns it so 'create readme' file
  //use it

  //this uses previously defined functions - and uses 'template strings' to populate it
  //Rightly or wrongly I kept contents as a string - as I felt turning into a function might have been 'overkill'
  
  const readme = `
  ${contents}
  ${genProjectTitle(title)}
  ${genDescription(description)}
  ${genInstallation(install)}
  ${genUsage(usage)}
  ${genContributing(contributing)}
  ${genTest(test)}
  ${genCredit(credit)}
  ${genImage(githubProfileUrl)}
  ${genEmail(email)}
  ${genLicense(license)}
  
 
  
  `;
  return readme;
};







//this function creates the readme.
const createGitReadme = (readme) => {
  fs.writeFile("gitReadme.md", readme, (err) => {
    if (err) {
      console.log(err);
      throw "There appears to be some problem and the file did not write";
    }
    console.log("GitReadme has been successfully created");
  });
};

initializer();
//this fires the initialization function.