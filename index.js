const https = require('https');
const fs = require('fs');
const inquirer = require('inquirer');
const dateString = require('./utils/getDate.js');
const {exec} = require('child_process');

const selections = { 
    'Art and design': 'artanddesign',
    'Books' : 'books',
    'Culture': 'culture',
    'Environment': 'environment',
    'Film': 'film',
    'Global Development' : 'global-development',
    'Local' : 'local',
    'Media' : 'media',
    'Music': 'music',
    'Opinion' : 'commentisfree',
    'Politics': 'politics',
    'Science': 'science',
    'Sport': 'sport',
    'Technology': 'technology',
    'World news': 'world' 
};

const writeFiles = (arr, cb) => {
    let callCount = 0;
    arr.forEach((item, index) => {
        callCount++;
        fs.writeFile(`./data/${sectionName}/${item.webPublicationDate}_${item.webTitle}`, JSON.stringify(item), (err, file) => {
            cb(null,file);
        })
    });
    console.log('Writing files to database...');
    if (callCount === 10) console.log('Complete!');
}; 

const chooseTopic = {
    name : 'chooseTopic',
    type : 'list',
    message : 'Choose a topic:',
    choices : Object.keys(selections),
    default : 'UK News'
};

inquirer.prompt(chooseTopic).then((answer) => {
    sectionID = selections[answer.chooseTopic];
    sectionName = answer.chooseTopic;
    const chooseOrder = [{
        type: 'list',
        name: 'chooseOrder',
        message: 'Choose a sort method:',
        choices: ['newest', 'oldest', 'relevance'],
        default: 'newest'
      }];
      inquirer.prompt(chooseOrder).then((answer) => {
        order = answer.chooseOrder;

        const options = {
            hostname : 'content.guardianapis.com',
            path: `/search?section=${sectionID}&order-by=${order}`,
            method: 'GET',
            headers: {
                'api-key': "a31ee6e0-02aa-4a4f-87b6-2669d8eb0791"
            }
        };   
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (data) => {
                body += data.toString();
            });
            res.on('end', ('end', () => {
                data = JSON.parse(body);
                articleArray = data.response.results;
                titleArray = articleArray.map(item => item.webTitle);
                fs.mkdir(`./data/${sectionName}`,(err, dir) => {
                    writeFiles(articleArray, (err, result) => {
                        if (err) console.log(err);                    
                    });
                    const chooseArticle = {
                        name : 'chooseArticle',
                        type : 'list',
                        message : 'Select an article to open in browser',
                        choices : titleArray,
                        default : titleArray[0]
                    };

                    inquirer.prompt(chooseArticle).then((answer) => {
                        const articleChoice = answer.chooseArticle;
                        for (i=0; i<articleArray.length; i++) {
                            if (articleArray[i].webTitle === articleChoice) {
                                exec(`xdg-open ${articleArray[i].webUrl}`, { cwd : process.cwd(), encoding : 'utf8' }, (err, stdout, stderr) => {
                                    if (err) console.log(err);
                                    else console.log('Opening link in browser...');
                                    
                                })
                            }
                        }
                    })
                })
            }))
        })        
        req.on('error', (err) => {
            console.error(err);
        });
        req.end();
    })
})