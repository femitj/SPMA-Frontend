# SPMA-Frontend

## Application Description
A Simple product management application that is based on a user’s location
 
<b> View UI template:</b>https://spma.netlify.app/<br/>
<b> Test API Endpoint: </b> https://spma-backend.herokuapp.com/api/v1/ <br/>
<b> Api docs: </b> https://www.getpostman.com/collections/a0b83d1615d5895f9b38</br>

## Table of content

 * [Features](#features)
 * [Technologies](#technologies)
 * [Installation](#installation)
 * [Testing](#testing)
 * [API Routes](#api-routes)

 ## Features

1. User can sign up.
2. User can login.
3. User can create product based on a location.
4. User can view products created.
5. User can view products based on his/her location.

## Technologies
HTML

CSS

Modern JavaScript technologies were adopted for this project

ES2015: Also known as ES6 or ES2015 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

## Installation
- Clone this repository into your local machine:

`git clone https://github.com/femitj/SMPA-Frontend.git`

- Install dependencies

`npm install`

`npm start`

- Open your browser and Navigate to

`localhost:3000`

- Install postman to test all endpoints

## API Routes

<table>
<tr>
<th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th>
<tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td>Signup user</td></tr>

<tr><td>POST</td> <td>api/v1/auth/login</td> <td>Sign in user</td></tr>

<tr><td>POST</td> <td>api/v1/product/create</td> <td>Create Product</td></tr>

<tr><td>GET</td> <td>api/v1/product/all</td> <td>Get all products</td></tr>
  
<tr><td>GET</td> <td>api/v1/product/me</td> <td>Get all products created by logged in user</td></tr>
  
<tr><td>GET</td> <td>api/v1/product/available_location</td> <td>Get all products available based on location</td></tr>

<tr><td>POST</td> <td>api/v1/comment/create/:productId</td> <td>Create a comment</td></tr>

<tr><td>POST</td> <td>api/v1/comment/reply/:commentId</td> <td>Reply to a comment</td></tr>
  
</table>
