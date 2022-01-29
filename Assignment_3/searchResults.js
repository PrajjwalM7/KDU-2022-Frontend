let searchBar = document.getElementById("searchInput");
let searchIcon = document.getElementById("searchIcon");
let searchResults = document.getElementsByClassName("searchTwitter__results")[0];
let containerUsers = document.getElementsByClassName("searchTwitter__users")[0];
let containerTweets = document.getElementsByClassName("searchTwitter__tweets")[0];
let containerTopics = document.getElementsByClassName("searchTwitter__topics")[0];
let closeBtn = document.getElementsByClassName("searchTwitter__close")[0];

searchBar.addEventListener('focus', function() {
    searchIcon.classList.add("changeIconColor");
    searchResults.classList.add("showSearchResults");
});

searchBar.addEventListener('focusout', function() {
    searchIcon.classList.remove("changeIconColor");
    searchResults.classList.remove("showSearchResults");
});
        

document.querySelector("#searchInput").addEventListener("input", search);

async function search(e) {
    let query = e.target.value;
    let typeSomething = document.getElementsByClassName("searchTwitter__empty")[0];

    if(!query) {
        typeSomething.classList.remove("hideBlock");
        closeBtn.style["color"] = "transparent";
        containerTopics.innerHTML = "";
        containerTweets.innerHTML = "";
        containerUsers.innerHTML = "";
    } else {
        closeBtn.style["color"] = "rgb(29, 155, 240)";
        typeSomething.classList.add("hideBlock");
        const addressURL = "http://localhost:3000/search/" + query
        let response = await fetch(addressURL);

        if (response.ok) { 
            let json = await response.json();
            displayData(json)
        } else {
            alert("HTTP-Error: " + response.status);
        }
    }
}

function clearText() {
    searchBar.value = null;
    closeBtn.style["color"] = "transparent";
}


function displayData(json) {
    let users = json["Users"]
    let tweets = json["Tweets"]
    let topics = json["Topics"]


    containerUsers.innerHTML = "";
    containerTweets.innerHTML = "";
    containerTopics.innerHTML = "";


    for(let [key, value] of Object.entries(users)) {

        let outerDiv = document.createElement("div");
        outerDiv.classList.add("searchTwitter__eachUser");

        let profileImg = document.createElement("img");
        profileImg.src = value["profilePic"];
        profileImg.classList.add("searchTwitter__topicImage")
        profileImg.classList.add("searchTwitter__topicImage_round");

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("searchTwitter__userDescription");

        let profileDiv = document.createElement("div");
        
        let profileSpan = document.createElement("span");
        profileSpan.classList.add("searchTwitter__userName");
        profileSpan.innerText = value["name"];
        profileDiv.appendChild(profileSpan);
        
        if(value["blueTick"] == true) {
            let blueTickImg = document.createElement("img");
            blueTickImg.classList.add("searchTwitter__topicImage");
            blueTickImg.classList.add("searchTwitter__topicImage_round");
            blueTickImg.classList.add("searchTwitter__topicImage_small");
            blueTickImg.src = "bluetick.png";
            profileDiv.appendChild(blueTickImg);
        }

        descriptionDiv.appendChild(profileDiv);

        let profileID = document.createElement("span");
        profileID.classList.add("searchTwitter__userID");
        profileID.innerHTML = "@" + key + "</br>";
        descriptionDiv.appendChild(profileID);

        let profileAbt = document.createElement("span");
        profileAbt.classList.add("searchTwitter__userAbout");
        profileAbt.innerText = value["about"];
        descriptionDiv.appendChild(profileAbt);

        outerDiv.appendChild(profileImg);
        outerDiv.appendChild(descriptionDiv);

        containerUsers.appendChild(outerDiv);
         
    }

    for(let [key, value] of Object.entries(topics)) {

        let outerDiv = document.createElement("div");
        outerDiv.classList.add("searchTwitter__eachTopic");

        let topicImg = document.createElement("img");
        topicImg.src = value["imageURL"];
        topicImg.classList.add("searchTwitter__topicImage")

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("searchTwitter__topicDescription");

        let topicID = document.createElement("span");
        topicID.classList.add("searchTwitter__topicHeading");
        topicID.innerHTML = key + "</br>";
        descriptionDiv.appendChild(topicID);

        let topicNews = document.createElement("span");
        topicNews.classList.add("searchTwitter__topicNews");
        topicNews.innerText = value["news"];
        descriptionDiv.appendChild(topicNews);

        outerDiv.appendChild(topicImg);
        outerDiv.appendChild(descriptionDiv);

        containerTopics.appendChild(outerDiv);
        
    }

    for(let [key, value] of Object.entries(tweets)) {

        let outerDiv = document.createElement("div");
        outerDiv.classList.add("searchTwitter__eachTweet");

        let tweetMatch = document.createElement("span");
        tweetMatch.classList.add("searchTwitter__tweetMatch");
        tweetMatch.innerHTML = value["content"] + "</br>";

        let tweetStat = document.createElement("span");
        tweetStat.classList.add("searchTwitter__tweetStat");
        tweetStat.innerText = value["stats"]["tweets"] + " tweets in the last one hour";

        outerDiv.appendChild(tweetMatch);
        outerDiv.appendChild(tweetStat);

        containerTopics.appendChild(outerDiv);

    }


    console.log(users)
    console.log(tweets)
    console.log(topics)
}