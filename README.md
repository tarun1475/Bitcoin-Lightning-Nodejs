# README #

This is the back-end http server for Otp verification application. 

### What is this repository for? ###

//Hello tutorial
* max-app-backend 
* 0.0.1
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Clone the repository
* make sure you have node installed on your machine
* run 
```
#!bash

npm install
```
* to install dependencies

```
#!bash

NODE_ENV=development node app.js
```

When running in cluster mode, you have to gracefully reload the server(addressing all clusters with the common alias).


```
#!python

pm2 gracefulReload max:7001
```
