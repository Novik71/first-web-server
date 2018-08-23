# Back End Block - First Web Server - Day 1

## Introduction

The goal of this sprint is to introduce you to how the internet and the web work, how applications communicate and transfer documents and data between them.

On Day 1 we'll fetch data from [The Guardian](https://open-platform.theguardian.com) and store it locally.

[The Guardian API Docs](https://open-platform.theguardian.com/documentation/)

[Try out some of the endpoints available to you before you start building your app](https://open-platform.theguardian.com/explore/)

__*NOTE:*__ You'll need to [register for a developer key](https://bonobo.capi.gutools.co.uk/register/developer) in order to make requests to the API

Store your application's keys in a config.js file at the root of your project. It's very important to ensure this file is never commited into git or published anywhere, otherwise any user could have access to your account. Make sure you add the config.js file to your .gitignore. You need to be able to require in your application's keys wherever you need them.

__You will need to do the following :__

1. GET the sections available in the guardian website

2. GET the content data back from the guardian for 2/3 particular topics of your choosing .  Think about how you can pull down this data and store it locally (perhaps in different folders for different topics)
- Use Node's fs module to store the fetched data locally. What would be the best way of organising this data? Keep in mind that we'll want to retrieve it later on. In what format would you store it?. 

3. GET the different editions from the guardian and store this locally as well

4. The Guardian's API gives you A LOT of data. Explore the documentation and only store the information you consider relevant or interesting. Write a function that strips away "useless" information from raw data/articles. Maybe you'll want to change the key names of some properties, maybe you'll want to perform calculations on certain values and store them. Think of how you'd like to display this data later on and process it accordingly.

5. See if you can make this whole process happen with a single NPM command.
