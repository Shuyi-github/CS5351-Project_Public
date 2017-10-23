
/*

Sample code written 4 years ago. Might not be the most 'common' way for nowadays.. but was hoping it can
act as a starter code to help you with Ajax -  if anyone isn't familiar with it.

Below is a JavaScript funciton triggered by any event - i.e. button click, and issues a http post request to server

*/

function handleLogInPublic(user_id, full_name) {

    var httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener('readystatechange', function() {

        // handling data returned
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var responseObj = JSON.parse(httpRequest.responseText);

            // server authenticates user
            if (responseObj.reply_data["exists"] == true && responseObj.reply_data["user_id"] == user_id && responseObj.reply_data["full_name"] != full_name) {
                document.getElementById("noti").innerText = "Public server error: user id used, or user id and full name does not match.";
            
            // server indicate user does not exist
            } else if (responseObj.reply_data["exists"] == false) {
                handleCreateUserPublic(user_id, full_name);

            // some other stuff
            } else {
                handleGetFriends(document.cookie.split("=")[1], "", 0);
                handleGetSups();
                drawSup(currSup);
            }
        }
    });

    // server info hardcoded here
    httpRequest.open('POST', "http://104.197.3.113/post");
    httpRequest.setRequestHeader('Content-Type', 'application/json');

    // actual data sent
    var objectToSend = {protocol_version: 1.2, message_id: Math.random(), command: "user_exists", command_data: {user_id: user_id}, user_id: user_id};
    httpRequest.send(JSON.stringify(objectToSend));
}