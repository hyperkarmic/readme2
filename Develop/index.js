const inquirer = require('inquirer');
const generateMD = require('./utils/generateMarkdown')

const questions = [
    {
        type: "input",
        name: "github", // check generateMarkdown - think execution context!
        message: "What is your GitHub username?"
      }

];



function writeToFile(fileName,data) {// what i need to do in here is use fs to write a file(generate brand new) in
    //the active directory and note the docu for writefile also need to look at genmarkdown file - make sure all questions
    //are being asked to hit all user questions
    //look into generating badges for a readme
    //what do we need to do to dynamically include bdsges?
    //one last hint - different input types - types of list ie user can have an option
}

function init() {
    inquirer
    .prompt(
        //pass in questions
      questions
    )
    .then((answers) => {
        writeToFile("readme.md", generateMD(answers))
      //need to pass in arguments ie filename (ie readme.md as a string)***data is trickier***
        // Use user feedback for... whatever!! take answers and run function on them and run a 'write to file
      //function
    })

}

init();
