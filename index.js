const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios")
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
];
const generateProjectTitle = (title) => {
  return `
  # ${title}
  `;
};
const generateDescription = (description) => {
  return `
  ## Description
  ${description}
  `;
};
const generateQuestions = (imageUrl) => {
  return `
  ## Questions
  ![user-name](${imageUrl})
  `
}
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
  const readme = `
  ${generateProjectTitle(title)}
  ${generateDescription(description)}
  ${generateQuestions(githubProfileUrl)}
  `;
  return readme;
};
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