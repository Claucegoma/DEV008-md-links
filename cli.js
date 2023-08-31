#!/usr/bin/env node
const yargs = require("yargs");
const { mdLinks, } = require('./index.js');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

console.log(boxen('¡Welcome to the cecy-md-links library!', {padding: 1, margin: 1, borderStyle: 'double', borderColor: 'green' }));

const options = yargs(process.argv.slice(2))
    .usage(chalk.bold.magentaBright('md-links ./path/to/file.md -v -s')) 
    .command('$0', chalk.blue('Default command'))
    .option('v', {
        alias: 'validate',
        describe: chalk.red('v for links validation'),
        type: 'boolean',
        demandOption: false,
    })
    .option("s", {
        alias: "stats",
        describe: chalk.blueBright('Print the links status of the .md file'),
        type: 'boolean',
        demandOption: false
    })
    .help(true)
    .demandCommand()
    .argv;

    //Shows all the unique links at the file
const fileUniqueLinks = (links) => {
    const uniqueLinks = new Set(links.map(link => link.href));
    return uniqueLinks.size;
};

//Shows how many broken links are at the .md file
const fileBrokenLinks = (links) => {
    return links.reduce((count, link) => {
        if (!link.ok) {
            count++;
        }
        return count;
    }, 0);
};

const route = options._[0];

if (route) {
    const mdLinksOptions = {
        validate: options.validate || false,
        stats: options.stats || false,
    };

    mdLinks(route, mdLinksOptions)
        .then(links => {//promise
            if (mdLinksOptions.stats) {
                const totalStats = chalk.bgMagenta.white(`Total: ${links.length}`);
                const uniqueStats = chalk.bgYellowBright.black(`Unique: ${fileUniqueLinks(links)}`);

                console.log(totalStats);
                console.log(uniqueStats);

                if (mdLinksOptions.validate) {
                    const brokenLinks = fileBrokenLinks(links);
                    const brokenStats = chalk.bgRed.white(`Broken: ${brokenLinks}`);
                    console.log(brokenStats);
                }

            } else if (mdLinksOptions.validate) {
                links.forEach(link => {
                    const statusInfo = link.ok ? chalk.green('ok') : chalk.red('fail');
                    const formattedLink = boxen(
                        `${chalk.bold.blue('href:')} ${chalk.blueBright(link.href)}\n` +
                        `${chalk.bold.blue('File:')} ${chalk.magenta(link.file)}\n` +
                        `${chalk.bold.blue('StatusInfo:')} ${chalk.white(statusInfo)}\n` +
                        `${chalk.bold.blue('Status:')} ${chalk.cyan(link.status)}\n` +
                        `${chalk.bold.blue('Text:')} ${chalk.yellow(link.text)}\n` ,    
                        {title: 'Links validation:', padding: 1, margin: 1, borderStyle: 'double' }
                    );
                    console.log(formattedLink);
                });
            } else {
                // is validation has not being selected, this will run
                links.forEach(link => {
                    const formattedLink = boxen(
                        `${chalk.bold.white('File:')} ${chalk.magenta(link.file)}\n` +
                        `${chalk.bold.white('href:')} ${chalk.blueBright(link.href)}\n` +
                        `${chalk.bold.white('Text:')} ${chalk.yellow(link.text)}\n`,
                        {padding: 1, margin: 0, borderStyle: 'double'}
                    );
                    console.log(formattedLink);
                });
            }
        })
        .catch(error => {//if something fail at the promise
            console.error(chalk.red(error.message));
        });
} else {
    const errorMessage = chalk.red("Something is wrong! try with a valid route.");
    console.error(boxen(errorMessage, { title: 'Error:', titleAlignment: 'left', padding: 1, margin: 0, borderStyle: 'double' })); 
    yargs.showHelp();
}






