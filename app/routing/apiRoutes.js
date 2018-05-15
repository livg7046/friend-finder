var friendData = require("../data/friends.js")

//////////////////////////////
//restart nodemon server.js everytime i make changes to this file
/////////////////////////////

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
        
        console.log(friendData);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        console.log('NEW  FRIEND' + newFriend);
        
        //Start logic for matching
        //----clear 
        var absArray =[];
        //1. Loop thru all friends
        for(var i = 0; i < friendData.length; i++){
            //2. Loop thru answers for all friends
            var sumOfDiff = 0 ;
            for(var j=0; j<10; j++){
                //3. Compare (via absolute value) newFriend.answers[] to all friends [] 
                var diff = newFriend.answers[j] - friendData[i].answers[j];
                var absOfDiff = Math.abs(diff);
                sumOfDiff += absOfDiff;
            }
            //4. Push compareValues to new array (with linked friend)
            absArray.push({name: friendData[i].name, score: sumOfDiff});
        }
        console.log(absArray);
        //5. display lowest value (best friend match)
        var lowestScore = 0;
        var friendName = "";
        for(var x = 0; x < absArray.length; x++)
        {
            if(x==0)
            {
                lowestScore = absArray[x].score;
                friendName = absArray[x].name;
            }
            else
            {
                if(lowestScore > absArray[x].score)
                {
                    lowestScore = absArray[x].score;
                    friendName = absArray[x].name;
                }
            }
        }

        var matchedFriend={name: friendName, score:lowestScore};
        //End logic for matching
        friendData.push(newFriend); // why doesn't this push to the js file?
        res.json({status: 'OK', matchedFriend: matchedFriend}); //Need this line otherwise, post won't work and will drive me nuts as to why it's not working
    });
};