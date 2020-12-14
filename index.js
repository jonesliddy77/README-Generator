var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

const inputs = () => inquirer.prompt([
    {
      type: "input",
      message: "What is your github username:",
      name: "username",
    },
    {
      type: "input",
      message: "Title of project:",
      name: "title",
    },
    {
      type: "input",
      message: "What is your github link:",
      name: "githubLink",
    },
    {
      type: "input",
      message: "What is your Project repo link:",
      name: "projectLink",
    },
    {
      type: "input",
      message: "Enter the description of your project:",
      name: "description",
    },
    {
      type: "input",
      message: "What websites did you use for references:",
      name: "reference",
    },
    {
      type: "input",
      message: "What Languages did you use to code:",
      name: "language",
    },
    {
      type: "input",
      message: "Developer-Notes:",
      name: "developerNotes",
    },
    {
      type: "input",
      message: "What do you need to do to install this project:",
      name: "install",
    },
    {
      type: "input",
      message: "How do you use the app/project:",
      name: "usage",
    },
    {
      type: "input",
      message: "Enter the names of contributors:",
      name: "contributors",
    },
    {
      type: "input",
      message: "Enter your email addess, so people can reach out if they have questions:",
      name: "questions",
    },
    {
      type: "input",
      message: "Enter your GitHub profile link:",
      name: "questions2",
    },
    {
      type: "input",
      message: "What were some test you did:",
      name: "test",
    },
    {
      type: "input",
      message: "Message for badge:",
      name: "badgeMessage",
    },
    {
      type: "list",
      message: "Enter licensing information:",
      name: "license",
      choices: [
        "BSD",
        "MIT",
        "GPL"
    ]
    },
    {
      type: "list",
      message: "What color badge would you like:",
      name: "licenseColor",
      choices: [
        "brightgreen",
        "yellowgreen",
        "yellow",
        "orange",
        "red",
        "grey",
        "lightgrey",
        "blue"

    ]
    }
  ])
  .then(function (data) {
    const queryUrl = `https://api.github.com/users/${data.username}`;
    axios
      .get(queryUrl)
      .then(function (result) {
        writeToFile(data, result.data.avatar_url);
      })
  });

const writeToFile = (data, pic) => {
  const content = ` 
  ![badge](https://img.shields.io/badge/license-${data.badgeMessage}-${data.licenseColor}.png)

  ![profile image](${pic})
  # ${data.title}  
    
  ## Description
    ${data.description}
  
    
  ## Table of Contents

  * [Links](#Links)
  * [References](#References)
  * [Demo](#Demo)
  * [Language](#Language)
  * [Developer-Notes](#Developer-Notes)
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Contributors](#Contributors)
  * [License](#License)
  * [Test](#Test)
  * [Questions?](#Questions?)
  

  ## Links
  * GitHub Repo: [Repository](${data.githubLink})

  * Project: [Link](${data.projectLink})

  ## References

  > - ${data.reference}

    
  ## Demo
  ![Demo](put gif path here)

  ## Language
  * ${data.language}

  ## Developer-Notes
  * ${data.developerNotes}
    
  ## Installation   
  * ${data.install}

  ## Usage
  * ${data.usage}

  ## Contributors
  * ${data.contributors}
  ## Test
  * ${data.test}

  ## Questions?
  * Email - ${data.questions}
  * [GitHub Profile] ${data.questions2}

  ## License
    Licensed under ${data.license}`;
  fs.writeFile("README.md", content, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("ReadMe made");
  });
}

inputs();
