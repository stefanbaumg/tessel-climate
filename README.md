# tessel-climate


**climate.js**

Uses the tessel microcontroller with the climate module to send temperature and humidity to firebase every second. 
Use tessel push climate.js to install on the tessel
Be sure to replace "FIREBASEACCOUNT" with your firebase account.

--

**index.html**

Uses highcharts and firebase to render a chart with temperature and humidity data from the tessel. The chart live-updates as new data is added to firebase.
Same here: Make sure you replace "FIREBASEACCOUNT" with your firebase account.

--

Keep in mind that this is for demo purposes and could be improved in many ways. For example, it'd be more efficient to do an initial load of the data from firebase before rendering the chart and only adding new data points as they come in. The climate.js file could also be made more robust by making sure an internet connection is available and if it isn't, store locally until connection is available again etc. etc... You get the idea.



See my post here for a more detailed breakdown:

http://www.codeadventures.com/real-time-temperature-humidity-graph-with-tessel/
