Phantom Football
=======================

##[Game Link](https://s3-eu-west-1.amazonaws.com/phantomfootball/index.html?X-Amz-Date=20160711T200622Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=a3d1ee78b2ef842257ef4341ff15d1e8ede49e7928a698a68af33c82502d6d07&X-Amz-Credential=ASIAJGNIYQMXIUDQLJCQ/20160711/eu-west-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEDUaDK4IBopnNhyDj1M1byLHAap/60Azkty9Jd8hyp9RXDxsI7VDAlkZSU2b0tLWmlPOLRQyu9DK81IRpIVRJbVqDP/KhU5JJ7TmHD7HPBmUk4nkSX3NVB3pzXgAc5f9TgwGGaWoUfvg1d5BNQDk9oOUQczIeF7Gj5b5tZn2mLE3kVPmlxxH8OuKxA7B/SBQ1/%2B8hNLVGUuBK4T%2BBa6qzp8QpvAcRkPrO7%2BJXI5IaRTDuQW1Q/d%2Bh6QaR1INn9UALydiD2IXSPKHqJCrj18PodxfxQilaUSnUYcoq/iPvAU%3D)

### Synopsis

Create a game, MPU sized  (300pixels x 250 pixels) where you play as a goalkeeper and have to defend 3 shots at goal.  


### Technologies Used

- HTML
- CSS
- Javascript
- GreenSock

### Job List

- [x] Title screen with click through
- [x] Make title screen animated and awesome!!!
- [x] Create Ball, Goal, Goal Keeper
- [x] User controls Goal Keeper
- [x] AI shoots ball towards goal at random X value points
- [x] Count Goals/Saves
- [x] Comply with task element size/shape/colour specifications
- [x] Make compatible with Google Adwords specifications 


### How to use

Open command line

Clone the repository:
```shell
$ git clone https://github.com/Scully87/Phantom_Football.git
```

Change into the directory:
```shell
$ cd Phantom_Football
```

Play in browser:
```shell
$ open index.html
```

### Solution
In order to create the game i first had to plan out a list of objectives that needed to be done.
Some specifications were already providied initially such as the the dimentions of the elements and for it to be adWorks compatible.
After creating the basics for the HTML and CSS the javascript game logic then followed. 

The initial functionionality to create was shooting the ball down the y axis at a set distance, the ball had to end up at a random x axis within the dimensions of the goal.
This was done by creating varibles for the shot distance, time, speed, x positioning. The varibles were put into a function and used to animate the ball.
The second piece of funtionality was to create a goal keeper that could save the ball within the dimensions of the goal.
I opted for the goal keeper to be controlled with the arrow keys to avoid accidental clickthrough to the exit handler if using the mouse, i also thought for consistency of using space bar to continue from the title screen that using keys would be better.
The keeper moves left and right, then a function was created to check whether the ball had gone passed a the keeper or hit the keeper, if it hit the keeper it would trigger a bounce back, if not then it would score a goal.

After the shooting/saving functionality was created it was a case of adding counters for goals/saves and making sure that we could reset the shot in order to have 3 shots.
The HTML copy was changed depending on the status of the game and the counter results. Like some banners out there i created a replay function which resets the whole game (shots, counters) to play again.
Last but not least, creating the cool title screen, i enjoy creating animations so it was fun.
The emphisise the text 'PRESS SPACEBAR' i decided making it pulse would draw the users attention to it. 
Added a few more quirks by dropping the football and making the text shake.

In conclusion, the HTML, CSS, counters, looping, reset and animations were quite straight forward.
I found that the most challenging part was coordinating the game logic where the goal keeper had to save the ball.
