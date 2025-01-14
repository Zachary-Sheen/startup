**CryptoHaven**

[My Notes](notes.md)

This project creates a website where people interested in cryptocurrency can come and converse about specific currencies.  It will allow people to track cryptocurrency in real time and discuss the cryptocurrencies with other people to figure out if it is worth investing in a certain currency.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

CryptoHaven is a website that will allow its users to track and converse about cryptocurrencies in real time.  It will allow people to talk about certain currencies and allow them to decide whether one is worth investing through help from others.  By combining live market data with community discussions, CryptoHaven allows users to make compelling decisions in a fast-paced world, as well as providing the tools to navigate the cryptocurrency market regardless of the user's experience.

### Design

![Design image](img.JPG)

Here is a sequence diagram that shows how users would interact with the backend to chat.

```mermaid
sequenceDiagram
    actor Jim
    actor Jimbo
    participant Program
    participant Cryptocurrency as Cryptocurrency Chat
    participant Server
    
    Jim->>Program: Login or Register
    Program-->>Jim: Authentication
    Jimbo->>Program: Login or Register
    Program-->>Jimbo: Authentication
    Jim->>Program: View Cryptocurrencies
    Program-->>Jim: Show Cryptocurrency List
    Jimbo->>Program: View Cryptocurrencies
    Program-->>Jimbo: Show Cryptocurrency List
    Jim->>Cryptocurrency: Join Chat
    Cryptocurrency-->>Jim: Display Chat Messages
    Jimbo->>Cryptocurrency: Join Chat
    Cryptocurrency-->>Jimbo: Display Chat Messages
    Jim->>Cryptocurrency: Send a Message
    Cryptocurrency-->>Server: Update Chat to All Chat Members
    Server-->>Jim: Display new message
    Server-->>Jimbo: Display new message
```

### Key features

- Secure login using HTTPS protocol.
- Uses an API called CoinGecko to get crypto information.
- Display of featured cryptocurrencies and their statistics.
- Ability to favorite certain crytocurrencies to always show them.
- Chat system for each cryptocurrency that allows users to communicate.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Create pages for login, dashboard, and chat rooms.
- **CSS** - Styling choices that make the site look appealing on different screen sizes with good color choice and object sizes.
- **JavaScript** - Provides login, pulls information from the CoinGecko API, and implements the ability to click a currency which sends the user to the chat and further information for that currency.
- **React** - Displays real-time updates for cryptocurrencies, ability to login, chat functionality, and displays new messages.
- **Service** - Backend service with endpoints for:
    - Login
    - Retrieving Currency Information
    - Sending Messages
    - Updating Chat for all Members
- **DB/Login** - Stores users and chat information in the database.  Credentials securely stored using password hashing.
- **WebSocket** - Enables real-time chat communication and shows new messages for each user, as well as communicates market data.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
