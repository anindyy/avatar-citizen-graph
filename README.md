# Avatar Citizen Graph
Anindya Prameswari / 135 18 034

## How to Run

For the deployed app, visit [the gh-pages](https://anindyy.github.io/avatar-citizen-graph/). 

For developing purposes, make sure you have [Node.js](https://nodejs.org/en/) installed on your computer. Then, you can run these commands in the project directory:

### `npm install`

Downloads required libraries to run app.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## How to Use

On the site, you will see a textbox asking for a citizen ID. Enter the person's ID whose friends you want to map, then click `map friends`. A friendship graph will appear on screen together with another textbox at the bottom containing additional information about someone with the queried ID.

You can click on nodes to map more connections between citizens. Information about the person you just clicked will be displayed on the bottom textbox, replacing just-queried information.

There might be cases where the graph freezes midway before reaching the center. This happens because mouse hover action stops the animation. To fix the graph, click `rearrange nodes`.

## Used Libraries
- [create-react-app](https://github.com/facebook/create-react-app)
- [react-d3-graph](https://www.npmjs.com/package/react-d3-graph)
- [material-ui](https://material-ui.com/)
- [axios](https://www.npmjs.com/package/axios)

## API Review

I found two main drawbacks from this API:

1. **Duplicates**. There are friend duplicates: some people are listed twice in the friends list. Duplicate data causes a graph error because nodes have to be unique, so you have to check the payload before displaying them in a graph. It will be better if the API returns a non-duplicating data.

2. **Inconsistency**. The data isn't consistent because some have their self included on their friends list and some doesn't. Because of this, you need to first remove their name from the list, map links, and re-add them to the list to map nodes. It will be better if the data is consistent, whether all person in the data includes themself in the friends list or all person doesn't. 

### Additional Review

Aside from those two drawbacks, I also found out that the friendships are one-sided (assuming that friendships are supposed to be two-way relationship). For example, a person with ID 76 is on ID 12's friends list, but ID 12 isn't on ID 76's friends list. 

While it does make developing easier (I don't have to check for duplicate links!), this one-sided friendships cause data inconsistency. Ideally, clicking on ID 12 then ID 76 should give the same result with clicking ID 76 then ID 12, but this API couldn't give the same result because ID 12 wouldn't be on screen in the latter case as they're not listed as ID 76's friend.

Solving this problem wouldn't be effective because then I have to make 168 requests (total of person listed in the API) for every ID the user queried, so I can search for people who included the queried person as their friend and add them as the queried person's friend. This means I will be abusing the server.

There are also an alternative where I send bulk requests at the start of the app and store data in the program, but that wouldn't be effective as well because I will need to make 168 requests every time the page reloads. Deploying a new database doesn't sound like a good idea at all. 

In the end, I realized this problem is a only minor detail, which doesn't really affect the performance, so I decided not to fix this. :)
