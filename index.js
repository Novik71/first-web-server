const https = require('https');
const fs = require('fs');
const inquirer = require('inquirer');
const child_process = require('child_process');
const dateString = require('./utils/getDate.js');

const selections = { 
    'Art and design': 'artanddesign',
    'Culture': 'culture',
    'Environment': 'environment',
    'Film': 'film',
    'Music': 'music',
    'Politics': 'politics',
    'Science': 'science',
    'Sport': 'sport',
    'Technology': 'technology',
    'World news': 'world' 
};

const chooseTopic = {
    name : 'chooseTopic',
    type : 'list',
    message : 'Choose a topic:',
    choices : Object.keys(selections),
    default : 'UK News'
};

inquirer.prompt(chooseTopic).then((answer) => {
    section = selections[answer.chooseTopic];
    console.log(section);
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
            path: `/search?section=${section}&order-by=${order}`,
            method: 'GET',
            headers: {
                'api-key': "a31ee6e0-02aa-4a4f-87b6-2669d8eb0791"
            }
        };
    
        const req = https.request(options, (res) => {
        
            console.log('statusCode:', res.statusCode);
            let body = '';
            res.on('data', (data) => {
                body += data.toString();
            });
            res.on('end', ('end', () => {
                data = JSON.parse(body);
                fs.mkdir(`./data/${answer.chooseTopic}`,(err, dir) => {
                    
                })



            }))
        })
        
        req.on('error', (err) => {
            console.error(err);
        });
        
        req.end();
})






    })