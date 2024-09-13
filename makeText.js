/** Command-line tool to generate Markov text. */

const MarkovMachine = require("./markov"), { default: axios } = require("axios"), fs = require("fs");
let theArg = process.argv[2], theInputArg = process.argv[3];

function txtFromFile(path) {
    fs.readFile(path, "utf-8", function (err, data) {
        if (err) {
            console.log(`Error reading ${path}:\n`, err.message);
            reject(err);
        }
        let output = new MarkovMachine(data);
        console.log(output.makeText());
    }
    )
}

async function txtFromUrl(url) {
    try {
        let html = await axios.get(url), output = new MarkovMachine(html.data);
        console.log(output.makeText());
    } catch (error) {
        if (error.status) console.log(`Error: Request failed with status code ${error.status}`);
        else console.log(`${url} is not a valid domain.`);
    }
}

if (theArg === "file") txtFromFile(theInputArg);
else if (theArg === "url") txtFromUrl(theInputArg);
else console.log("Invalid input.");