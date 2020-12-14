var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your github username:",
      name: "username",
    },
    {
      type: "input",
      message: "Enter badges (Ex: label, message, color; label, message, color;):",
      name: "badges",
    },
    {
      type: "input",
      message: "Title of project:",
      name: "title",
    },
    {
      type: "input",
      message: "What is your github repo link:",
      name: "githubLink",
    },
    {
      type: "input",
      message: "What is your Project link:",
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
      name: "languages",
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
      message: "What were some test you did:",
      name: "test",
    },
    {
      type: "input",
      message: "Enter licensing information:",
      name: "license",
    },
  ])
  .then(function (data) {
    const queryUrl = `https://api.github.com/users/${data.username}`;
    axios
      .get(queryUrl)
      .then(function (result) {
        writeToFile(data, result.data.avatar_url);
      })
      .catch((error) => {
        console.log("incorrect GitHub username");
      });
  });

function writeToFile(data, pic) {
  const badges = UsersBadge(data.badges);
  const content = ` ${badges}
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
    * [Contributors](#Contributors)
    * [License](#License)
    
    ##Links
    *GitHub Repo:[Repository](${data.githubLink})

    *Project:[Link](${data.projectLink})

    ##References

  > - ${data.reference}

    
    ##Demo
    ![Demo](put gif path here)

    ##Language
    * ${data.language}

    ##Developer-Notes
    * ${data.developerNotes}
    
    ##Installation   
    * ${data.install}

    ##Usage
    * ${data.usage}

    ##Contributors
    * ${data.contributors}
    ##Test
    * ${data.test}

    ##Questions?
    *[Email] ${data.questions}
    *[GitHub Profile] ${data.questions}

    ##License
    MIT © ${data.license}`;
  fs.writeFile("README.md", content, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("ReadMe made");
  });
}
function UsersBadge(userInput) {
  const Url = [];
  const takeOutSpaces = userInput.split(" ").join("");
  const badges = takeOutSpaces.split(";");
  let newBadges = "";
  badges.forEach((badge) => {
    badge = badge.split(",");
      Url.push(`![${badge[0]}](https://img.shields.io/static/v1?label=<${badge[0]}>&message=<${badge[1]}>&color=<${badge[2]}>)`);
  });
  for (let i = 0; i < Url.length; i++) {
    newBadges += Url[i] + " ";
  }
  return newBadges;
}

function init() {}

init();
