import express from "express";
import cors from "cors";
import * as users from './users.json';
import * as tweets from './tweets.json';
import * as topics from './topics.json';

let userList = users["default"]
let tweetList = tweets["default"]
let topicList = topics["default"]

function getRelevantUsers(query) {
    let output = {}
    query = query.toLowerCase()
    for(const [key, value] of Object.entries(userList)) {
        if(key.toLowerCase().includes(query) || value["name"].toLowerCase().includes(query)) {
            output[key] = value;
        }
    }
    return output
}

function getRelevantTweets(query) {
    let output = {}
    query = query.toLowerCase()
    for(const [key, value] of Object.entries(tweetList)) {
        if(value["content"].toLowerCase().includes(query)) {
            output[key] = value;
        }
    }
    return output
}

function getRelevantTopics(query) {
    let output = {}
    query = query.toLowerCase()
    for(const [key, value] of Object.entries(topicList)) {
        if(key.toLowerCase().includes(query) || value["news"].toLowerCase().includes(query)) {
            output[key] = value;
        }
    }
    return output
}


const app = express();

app.use(cors());

app.get('/search/:query', (req, res) => {
    let query = req.params.query;
    let result = {}
    result["Users"] = getRelevantUsers(query);
    result["Tweets"] = getRelevantTweets(query);
    result["Topics"] = getRelevantTopics(query);
    res.json(result);
});

app.listen(3000, () => {
    console.log("Successful!")
})





// npx nodemon --experimental-json-modules searchTwitter.js