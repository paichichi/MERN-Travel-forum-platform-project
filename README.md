# React App: Travel Planner

Welcome to Travel Planner, a comprehensive platform that allows you to plan your trips, search hotels, view weather information, and share your travel experiences with others. This project is designed to provide users with a seamless travel planning experience, making it easy to search and compare various options for your trip.

# How to run this project

## Prerequisites

Node.js must be installed to run this project

## installation and running the project

1. Clone the project to your local machine.
2. Create `.env` file in `./frontend` directory with following content.

```
REACT_APP_BASE_URL=http://localhost:8080
```

3. Create `.env` file in `./backend` directory with following content.

```
DB_HOST=mongodb+srv://bugwriter2023:Pray4BugFree@cluster0.pfcz6uh.mongodb.net/?retryWrites=true&w=majority
```

4. Open `./frontned` directory in terminal and install dependencies

```bash
  cd ./frontend #from the root directory of the project, go to frontend directory
  npm install # install dependencies
```

5. Open `./backend` directory in terminal and install dependencies

```bash
  cd ./backend #from the root directory of the project, go to backend directory
  npm install # install dependencies
```

6. Run backend Express server

```bash
  cd ./backend #from the root directory of the project, go to backend directory
  npm start
```

7. Run frontend React app

```bash
  cd ./frontend #from the root directory of the project, go to frontend directory
  npm start
```

8. Important information about API keys:

We have tried our best to minimize the number of API calls. However, the hard limit of 500 calls/month may not be easy to meet. Therefore, we have provided a few backup keys for hotel information requests in line 23 of AccomodationView.jsx. If it fails to load hotel information after clicking "search" and expanding the destination, you may want to try the backup keys in the comment.

9. Super Account

```bash
Account: bug.writer2023@gmail.com
Pwd: Pray4BugFree
```

This account is for accessing MongoDB. If you are unable to access our back-end request data, please use this account to log into the system and join the access whitelist.

10. Account access

This account is for you to use to log into our system. Feel free to use it. If you want to test or use it for other purposes, please register a new account.
```
Account: Marker
Pwd:pa55word
```
# Features

## Travel Planner

The Travel Planner feature allows you to plan your trips by searching for multiple destinations at once and finding the best hotel options available. Here are some of the main features of this section:

### Select Locations to Travel

In the search section, you can search for travel destinations by providing the country, city, dates, duration of the trip, and the number of people. You can search for multiple destinations at once by adding multiple destination information simultaneously.

### Search Hotels

After searching for a location, you can see all the available hotels for your searched location(s). You will see a map view that contains each hotel with precise location information and the cost for the stay. You can also see a brief description and the facilities provided by each hotel. This makes it easy to compare different options and choose the best hotel for your trip.

### Detailed Hotel Information

If you find a hotel you like, you can view more detailed information about it. This includes reviews, detailed descriptions, parking information, and facilities provided. Moreover, you can view photos of the hotel rooms and common areas, as well as the hotel's contact information, making it easier for you to make a well-informed decision.

### View Weather

You can see the weather information for your chosen location during your selected travel duration. This helps you plan your activities and pack your luggage accordingly, ensuring a comfortable and enjoyable trip.

### Save Plan

You can save multiple plans for later viewing or editing. This feature allows you to come back to your plans at any time and make changes as needed, ensuring that your travel itinerary is always up-to-date and perfectly tailored to your needs.

## Forum

The Forum feature allows you to share your travel stories and experiences with others, and read what others have shared. Here are some of the main features of this section:

## Share Your Stories

You can create a post by clicking the "Share Your Stories" button. Here, you can choose the location that you stayed at, and tell everyone about your great experience. You can also upload photos and videos to further showcase your adventure. Others can like and comment on your post, fostering a sense of community and engagement.

## Read Others Stories

You can browse through the posts that other people have shared about their trips. You can like and leave comments to show your interest or ask questions. If you think there are too many posts, you can filter them by location or even the name of the author.

We hope you enjoy using Travel Planner for your next trip!

# Tests

## Frontend (React) - React Testing Library

You can run frontend component test cases by running `npm test` in `./frontend` directories

## Backend (Express Server) - Postman

We utilized Postman to test the functionality of our Travel Planner application's Express server. Postman allowed us to easily send HTTP requests to the server and receive the responses, which helped us verify that the server was correctly handling different types of requests and returning the expected data. Overall, using Postman made the testing process smoother and more efficient.

[Postman workspace for Forum feature](https://www.postman.com/altimetry-explorer-81151412/workspace/postman-testing-for-backend/request/16189776-805431c5-eb33-414b-a983-daaa8374ebb1)

[Postman workspace for Travel Planner feature](https://www.postman.com/avionics-explorer-49655998/workspace/travel-palnn/overview)
