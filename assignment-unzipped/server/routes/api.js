const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
// Mocking checkin data
//const API = 'https://api.myjson.com/bins/1gbtq3';
const API = 'http://localhost:3000/assets/i18n/posts.json';


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


router.get('/posts',function(req,res){
	let bookingCode = req.query.bookingCode;
	let familyName = req.query.familyName;
   axios.get(`${API}`)
    .then(posts => {	

		var bookingCodeValidFlag = false;
		var familyNameValidFlag = false;
		var checkinAvailabilityFlag = false;
		var pData = posts.data;
		console.log(pData.length);	
		for(var i=0; i < pData.length; i++){
			if(pData[i].bookingCode == bookingCode){
				bookingCodeValidFlag = true;
			}
			if(pData[i].familyName == familyName){
				familyNameValidFlag = true;
			}
			if(pData[i].checkinAvailablity == 'available'){
				checkinAvailabilityFlag = true;
			}
			
		}
		if(bookingCodeValidFlag && familyNameValidFlag && checkinAvailabilityFlag){
			console.log('success');
			res.status(200).send('succusee');
		}else if(!bookingCodeValidFlag){
			res.status(400).send({error : 9001, errorMsg: "Invalid booking code"});
		}else if(!familyNameValidFlag){
			res.status(400).send({error : 9002, errorMsg: "invalid family name"});
		}
		else if(!checkinAvailabilityFlag){
			res.status(400).send({error : 9003, errorMsg: "checkin not available"});
		}
		//res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});



module.exports = router;