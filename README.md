How to run - 
Android - open project terminal and  type "npm run android".

iOS - open project terminal and type "npm run ios".


The code for the app is in the "src" folder. However the initial page where the navigations are added is in the "app--> _layout.tsx" file as it was the default structure in the latest expo version.


Please login to the app using 

username - user   // it is case sensitive
password - 123

When login is successfull, you will get the list of houses and on click on any house, you will be navigated to the House details page when you can see the Unlock button if your current location is 30 meters away from the house. Please allow expo to use your location.
On click of Unlock button, you will be prompted with a success or failure alert message.


Please note : I have used inline css. For state management I have used Redux and used a JSON file to get the houselist and details

