//we start by importing the three libraries that we need//

const fs = require("fs");
//this gives us file system

const inquirer = require("inquirer");
//this gives us inquirer

const axios = require("axios")
//this imports axios

//this is everything that needs importing //

//Table of contents
const contents = `Table Of Contents

1)Project Title

2)Description

3)Table Of Contents

4)Installation

5)License

6)Contributors

7)Tests

8)Questions
a - Github User Profile Picture
b - user github profile Pic 





`



//this is an array - that contains questions! - it corresponds to the 'inquirer' module pattern.

const questions = [
  {
    name: "username",
    message: "Enter your GitHub username",
    type: "input",
  },
  {
    name: "title",
    message: "Enter your project title",
    type: "input",
  },
  {
    name: "description",
    message: "Enter your project description",
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
    message: "Provide information on application usage - including screenshots!",
  
  },
  {
    name: "contributing",
    message: "Explain how users can contribute to this project.  The guidelines at Contributor Covenant - (https://www.contributor-covenant.org/) - are industry standard - but feel free to develop your own!!!",
    type: "input",
  },
  {
    type: "input",
    name: "test",
    message: "Information on writing and running tasks for this application to go here",
  
  }
];



//this function generates project title
const generateProjectTitle = (title) => {
  return `
  # ${title}
  `;
};


//this function generates a description
const generateDescription = (description) => {
  return `
  ## Description
  ${description}
  `;
};


//this function generates questions
const generateQuestions = (imageUrl) => {
  return `
  ## Questions
  ![user-name](${imageUrl})
  `
}

const generateInstallation = (install) => {
  return `
  ## 
  ${install}
  `;
};

const generateUsage = (usage) => {
  return `
  ## 
  ${usage}
  `;
};

const generateContributing = (contributing) => {
  return `
  ## 
  ${contributing}
  `;
};

const generateTest = (test) => {
  return `
  ## Test
  ${test}
  `;
};



function init() {
  const processQuestions = (data) => {
    const url = `https://api.github.com/users/${data.username}`
    axios.get(url).then((response) => {
      data.githubProfileUrl = response.data.avatar_url
      const readme = constructReadme(data);
      createReadmeFile(readme);
    })
  };
  inquirer.prompt(questions).then(processQuestions);
}
const constructReadme = (data) => {
  const githubProfileUrl = data.githubProfileUrl;
  const title = data.title;
  const description = data.description;
  const install = data.install;
  const usage = data.usage;
  const contributing = data.contributing;
  const test = data.test;

  //read me - gathers data to be written to readMe file and returns it so 'create readme' file
  //use it

  //this uses previously defined functions - and uses 'template strings' to create it
  
  const readme = `
  ${contents}
  ${generateProjectTitle(title)}
  ${generateDescription(description)}
  ${generateQuestions(githubProfileUrl)}
  ${generateInstallation(install)}
  ${generateUsage(usage)}
  ${generateContributing(contributing)}
  ${generateTest(test)}
  
 
  
  `;
  return readme;
};

console.log('hello')





//this function creates the readme.
const createReadmeFile = (readme) => {
  fs.writeFile("myReadme.md", readme, (err) => {
    if (err) {
      console.log(err);
      throw "Failed to write to file :(";
    }
    console.log("Your README.md file is now ready :)");
  });
};

init();
//this fires the initialisation function.