/***************************************************************
  node.js express app file form server upload w/ Multer demo
  App created by:  Jesse Lewis
  Multer Config used based on tutorial by Ashish Mehra via Youtube
  @ https://www.youtube.com/watch?v=sMnqnvW81to&lc=z23htp54jwmhwni0nacdp43axbwhgu3y3fg0jwzwhatw03c010c
******************************************************************************************************/

  // RUN PACKAGES
  const express = require('express');
  const fs = require('fs');
  const multer = require('multer');
  const bodyParser = require('body-parser');
  var Tesseract = require('tesseract.js');

  // SETUP APP
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
//  app.use('/', express.static(__dirname + '/public'));
  var options = {
	index: './public/index.html'
  };
  app.use('/', express.static('/home/site/wwwroot', options));
  
  //MULTER CONFIG: to get file photos to temp server storage
  const multerConfig = {

    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

      //specify destination
      destination: function(req, file, next){
        next(null, './public/photo-storage');
      },

      //specify the filename to be unique
      filename: function(req, file, next){
        console.log(file);
        //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
        const ext = file.mimetype.split('/')[1];
        //set the file fieldname to a unique name containing the original name, current datetime and the extension.
        next(null, file.fieldname + '-' + Date.now() + '.'+ext);
      }
    }),

    // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }

        // only permit image mimetypes
        const image = file.mimetype.startsWith('image/');
        if(image){
          console.log('photo uploaded');
          next(null, true);
        }else{
          console.log("file not supported")
          //TODO:  A better message response to user on failure.
          return next();
        }
    }
  };

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
  /* ROUTES
  **********/
  app.get('/', function(req, res){ 
    res.render('index.html');
//	  res.sendFile(path.join(__dirname + '/index.html'));
  });

  app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
      //Here is where I could add functions to then get the url of the new photo
      //And relocate that to a cloud storage solution with a callback containing its new url
      //then ideally loading that into your database solution.   Use case - user uploading an avatar...
      console.log(res);
      //jsonWrite();
      Tesseract.recognize('maersk.jpg')
        .progress(function  (p) { console.log('progress', p)  })
        .catch(err => console.error(err))
        .then(function (result) {
          console.log(result.text)
          process.exit(0)
        });
      res.send('Complete! Check out your public/photo-storage folder.  Please note that files not encoded with an image mimetype are rejected. <a href="index.html">try again</a>');
  });

  // RUN SERVER
  app.listen(port,function(){
    console.log(`Server listening on port ${port}`);
  });



function jsonWrite () {
    // json data
  var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
  
  // parse json
  var jsonObj = JSON.parse(jsonData);
  console.log(jsonObj);
  
  // stringify JSON Object
  var jsonContent = JSON.stringify(jsonObj);
  console.log(jsonContent);
  filePath = './public/data' + '-' + Date.now() + '.txt';
  fs.writeFile(filePath, jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
  
      console.log("JSON file has been saved.");
  });
}