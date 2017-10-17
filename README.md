## Image comparator express server for protractor-image-comparison result

https://github.com/wswebcreation/protractor-image-comparison

## run

npm run start

## api specifications

This server provides api for 2 functionalities :

Precondition : From front end you should send the 'scenario' root folder path which contains all the records for the 
protractor-image-comparison result

1. It traverses all the nested folders and files and generates a json structure with path of all folders or files

2. You can accept an image , so this will overwrite the existing base image with the actual file and deletes the actual file from the record.

if you are starting server at 7000 else you can change it in server.js to your suitable port and replace it in below specifications.

baseURL = 'http://localhost:7000/api'

1. baseURL + +'/scenarios?root=' + '/path/to/root/folder' [GET]

2. baseURL + +'/file' [POST]
    body : 
    {
        "accepted":true,
        "actfilepath":"path/to/actual/file/which/is/accepted",
        "basefilepath":"path/to/baseline/file/which/will/be/overwritten"
    }


