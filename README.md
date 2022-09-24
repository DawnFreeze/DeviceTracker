# QA Device Tracker V1.0

The purpose of this repository is to maintain a full system to enable trust-based device tracking within development teams.

<hr/>

### Table of Contents  
- [Application](#application)  
- [AWS Backend](#aws-backend)  
- [Database Structure](#database-structure)  
- [Web Application](#web-application)  

<hr/>

## Application

This sytem utlizes an application built and compiled in FlutterFlow that allows trust-based device checkout/checkin based on a unique pin attributed to a single user, and housed in a Dynamo database. This pin is used to assign all actions performed within a given session to a single, authorized user. <br/>

Actions offered within the apps:
> - Check-out Device: submit an object containing the authorized users identity attribute and a device code
> - Check-in Device: Remove the 'in-use' attribute and move the current user to the status of previous user

Application flow chart:

![devicetracker app flow](./assets/devicetrackler-app-flow.png)

TODO: app screens <br/>
TODO: apk/ipa download links

<hr/>

## AWS Backend

TODO: overview <br/>
TODO: architecture diagrams

<hr/>

## Database Structure

TODO: table object definitions

<hr/>

## Web Application

TODO: purpose <br/>
TODO: running and configuring instructions <br/>
TODO: 

<hr/>
