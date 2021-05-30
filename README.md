# Portfol.io

This is a MERN application that aims to simplify the creation of Portfolio websites for users.

## Proposed level of achievement

Artemis

## Motivation

Building a **personal website** can seem daunting, and many people are put off from the fact that it requires **programming experience** and design know how. 
However, having personal portfolio websites can really make individuals **stand out** from the crowd, giving them the attention they deserve. 
Our project aims to act as a middleman, helping job seekers convert their resumes into interactive, appealing personal portfolio websites that will impress their hopeful employers. 

## Aim

We hope to make a website portfolio generator to **convert** resumes into **customizable** web pages that we will also facilitate in **bringing online**. 
Themes and pre-sets will be further provided to give the website a professional look and feel.

## User Stories

1. As a student who has little experience in web development and programming, I want to have a personal website so I can better showcase my skills and track record.

2. As a graduate I want to be able to easily update my personal websites to reflect what I have done recently.

3. As a job seeker I want to better impress my employers and stand out from the other applicants.

## Scope of project

The Portfol.io web application provides an interface for users to login via Github and grant us permissions to make changes to their Github repositories. We
aim to leverage on Github Pages to help users build their very own Portfolio website, which will be hosted for free via Github Pages.

## What separates us from similar platforms?

## Program flow

![ScreenShot](Orbital/ProgramFlow.jpg)

The user's Portfolio component can be rendered into HTML and CSS files. We will build the Javascript file to enable the same functionality that the user's Portfolio
site has as well as to define routing.

This can then be pushed to a Github repository of the user's choice. The Github repository can then be deployed to Github Pages as a functioning website.

With the help of Github API and OAuth, the above process can be done automatically, leaving only design to be done by the user.

## Showcase

To view the site in progress, you can visit https://54.169.10.179/

In the Home page, you will see the **Login with Github** button. Click that to be redirected to Github to login.

You will then have to grant the OAuth application permission to make changes to your repositories.

Once done, you will be redirected to DashBoard.

Click on test Publish to be taken to the Publish Overlay, where you will see a Publish button on the bottom right.

Click on it to expand the menu. Click on **Finalize and Push** to spawn a dialog prompting you to input a Github repository name.

You will also be prompted to add a file. For example, input `index.html` for file name and `<h1>hello world!</h1>` for file content

If you choose to input a repository name that you do not have and click on **Finalize**, a new Github repository will be created for you. The index.txt file
will be pushed to the Github repository and that repository will be deployed to Pages. 

Visit https://`USERNAME`.github.io/`REPOSITORYNAME`/ where USERNAME and REPOSITORYNAME should be replaced by your Github username and Github repository name respectively.

## Documentation

Visit https://colon-wq.github.io/Portfolio/ to view documentation for Frontend React application.
