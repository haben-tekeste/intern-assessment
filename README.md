# Internship Assessment

## Approach and Thought Process

The first approach I undertook was to have a thorough examination of the requirements. This included understanding of the data source for extraction (reaction data from a post), and defining the desired output (list of reacted users). I then proceeded to understand the provided source code, and how the extension was working before I had worked on my automation part.

I had to decide which post's reactino I should extract and decided that I should extract the reaction of the first post that appears on the feed.

Before proceeding to implement the functionality, I tried to see how I could find the users who reacted to a post on linkedin manually. This enabled me to know the steps I should follow when implementing the functionality.

After that I decided to implement the functionality. First, I had to to inspection on the feed page so that I could find the ids or classes of the elements I require such as post, button to fetch more users.

When I started working on the function, I tried first to query select the first post that appears on the feed and then click on the link that displays the modal that shows the reactions. And then I tried to extract the users that appeared on the modal just by query selecting the list that holds all the users that reacted to that specific post store is as array and the convert to string before displaying it using alert function.

The issue was since the the users were loaded dynamically, the alert function was invoked before the users are loaded and the modal appears on the screen. Hence, no users were being able to be extracted.

So, I had to make sure that the extraction is conducted after a certain amount of time once the modal is loaded into the DOM and the users are fetched and displayed in the modal. I had to do research if there is a way I could know when there is a change in the DOM, like elements added or removed from the DOM. And, that's where chatgpt came into hande, I came across Mutation Observer.

I had to go through the documation about Mutuation Observer. Then, I tried to create an observer for the modal, so that the extraction is done once the modal added into the DOM. However, again since the users are loaded after a certain time, the extraction was completed in a fraction of second hence not able to extract users. Moreover, another issue was that the observer was running for both modal removal and addition to the DOM. The problem with this was even when I click on the close button the alert function was being invoked, and also the observer was running normally if i click on a post without using the extension.

So, I had to come up with another solution and decided that using promises instead. Because, the whole process was taking after a certain amount of time.

Hence, I created a function that returns a promise after clicking on an HTML element. The aim of this was so that the extraction takes place after the modal was added into the DOM when the a post is clicked. After the promise is resolved, I proceeded to extract the users data from the modal of reactions. This time it worked, and I was able to extract the users.

Another thing was that the modal displayed a certain number of users at a time, and provided button to display more users. I wanted to display all the users who reacted to the post. Hence, my approach was to click on the button to fetch more users until all the users where displayed. So, I had to make sure that the button was to be clicked every once and then. So I though of using intervals and promise to implement this. The button was clicked every interval and promise is resolved when there is no button anymore. Additionally, the promise is resolved immediately if all the users were already fetched.

Even though this was working, I wante to also scroll to the bottom of the modal so that it shows the clicking of the button and displaying of more users. Hence, I inspected the structure of the page to find the id of the container responsible for scrolling. Once, i selected the container i made sure for every click of the button the modal scrolled to the bottom to show all the users.

Even though desired bahaviour was implemented, there was an issue with the alert function. Apparently, the alert function truncates the list of users to be displayed. After searching about this, I learned that since the alert function is designed to display short messages it has a limit after which the message is truncated. I decided to leave it there since I felt the extraction was successful even though alert function was not showing all the users.
