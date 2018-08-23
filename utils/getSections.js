const https = require('https');
const fs = require('fs');
const apiKey = require('../config.js');

const options = {
    hostname : 'content.guardianapis.com',
    path: `/sections`,
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
        object = JSON.parse(body);
        trimmedSections = object.response.results.map(result => {
            let trimSection = {};
            trimSection.id = result.id;
            trimSection.name = result.webTitle;
            // trimSection.webUrl = result.webUrl;
            // trimSection.apiUrl = result.apiUrl;
            return trimSection;
        });
        selectedSections = trimmedSections.filter(section => {
            return ['Art and design',
            'Culture',
            'Environment',
            'Film',
            'Music',
            'Politics',
            'Science',
            'Sport',
            'UK News',
            'Technology',
            'World news'].includes(section.name)
        });
        let finalArray = selectedSections.reduce((result, section) => {
            result[section.name] = section.id;
            return result;
        }, {})
        console.log(finalArray);
        
    }))
})



req.on('error', (err) => {
    console.error(err);
});

req.end();

