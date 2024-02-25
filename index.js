import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([{
        message: "Give me a website address: ",
        name: "URL",
    }, {
        message: "File output? (png, jpg, svg, pdf): ",
        name: "fileFormat",
        choices: ["png", "svg", "jpg", "pdf"],
    }])
    .then((answers) => {
        const url = answers.URL;
        const fileFormat = answers.fileFormat ?? "png";
        var qr_svg = qr.image(url, { type: fileFormat });
        qr_svg.pipe(fs.createWriteStream(`qr-img.${fileFormat}`));

        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            console.log(`Something went wrong here is the error object, take it to the brogrammer: ${error}`);
        }
    });