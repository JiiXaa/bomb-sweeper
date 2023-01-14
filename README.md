# Bomb Sweeper

## About

Bomb Sweeper is a game where you have to find all the bombs on the board. The game is played on a grid of squares. Some squares contain bombs, others don't. If you click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs) you win. Clicking a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. Use this information plus some guess work to avoid the bombs. To reveal a square, left-click on it. To mark a square you think is a bomb, use right-click. </br> </br>
Game has three difficulties with following board setup: </br>
**Beginner:** 8 / 8 squares with 10 hidden bombs. </br>
**Intermediate:** 16 / 16 squares with hidden 40 bombs. </br>
**Expert:** 16:30 squares with 99 hidden bombs.

## Contents

- [**User Experience**](#user-experience)
  - [**User Stories**](#user-stories)
- [**Design Choices**](#design-choices)
  - [**OOP Approach**](#oop-approach)
  - [**Pseudocode**](#pseudocode)
  - [**App Design**](#app-design)
  - [**Mobile Functionality**](#mobile-functionality)
  - [**Possible features to add in future**](#possible-features-to-add-in-future)

## User Experience

### User Stories

- As a first time player, I want to know the game instructions/rules.
- As a player I want to be able to change game difficulty and reset it any time during the game.
- As a player I want to reset the game.
- As a player I want to be able to flag/unflag a cell with potentially hidden bomb.
- As a player I want to see how many bombs left after I have flagged some.
- As a player, if bomb exploded I want to know position of remaining bombs, and my correctly predicted (flagged) ones.
- As a player, if win the game I want to know how many clicks and seconds it took to complete.
- As a frequent player I want to be able to see and compare my previous scores.

## Design Choices

### OOP Approach

Class based project (Object Oriented Programming paradigm) seemed to be good choice because: - Code is cleaner, functions (methods) are stored in objects. - it provides encapsulation thus better readability. - Strict Mode out of the box - Good practice.

### Pseudocode

1. [x] Create Initial Utility Class with features:

- [x] selecting element from the DOM for easy manipulation,
- [x] toggle of the elements visibility,

2. [x] Create Main Menu Class with features:

- [x] Load Game depending on set difficulty
  - [x] Used Google Search to find rules of minesweeper for difficulty levels: <br>
        "There are three difficulty levels for Minesweeper: beginner, intermediate, and expert. Beginner has a total of ten mines and the board size is either 8 × 8, 9 × 9, or 10 × 10. Intermediate has 40 mines and also varies in size between 13 × 15 and 16 × 16. Finally, expert has 99 mines and is always 16 × 30 (or 30 × 16)."
- [x] Options, where user can change level of difficulty (default set to beginner)

  - **Possible feature to add in future**:
  - [] Extra feature hardcore mode with the timer counting to zero and explode bombs if not game is not finished before time is over, that would set difficulty on another level.
  - [] For hardcore mode change colors of the game to more aggressive.

3. [x] Game Logic Class

- [x] Create game board depending on board size and bomb count set by user.
- [x] Left Mouse Click on a board's cell reveals either bomb (that ends the game) or number showing how many bombs are around that cell.
- [x] Right Mouse Button on a board's cell marks the user choice/prediction for bomb location
- Win/Lose condition:
  - [x] **lose**: when user click on the cell with bomb - reveal all bombs for user to see their locations.
    - [x] also show "lose" paragraph on the screen (possible: change game's logo to red? / sound of the bomb?)
  - [x] **win** after all bombs are marked correctly and rest of cell's are revealed.
    - [x] also show "win" paragraph on the screen (possible: change game's logo to green? / sound for the win condition)
- [x] Show how many bombs are selected/guessed (count shown with flag emoji, decreasing/increasing depending on the user selection)
- [x] New Game Buttons for all three difficulties (reset whole game)
- [x] Game tracks player moves count and time of the current game (in seconds)
- [x] Developer Mode: when key sequence 'bombs' is pressed it shows/highlight bomb locations, it mostly implemented to speed up development process but also wanted add it as it reminds me of old games cheat codes.
      It is possible to clear highlighted bombs with key sequence: 'clear'.
- [x] Leader board stored in localStorage to persist 5 best scores for each difficulty.
  - [x] Display scores on the LeaderBoard page (component) for user to see previous scores.
- [x] **First click never can be a bomb hit:** <br>
      The game board is generated randomly before the player clicks any squares. If the player happens to click a bomb square on their very first click, the bomb at this square is removed and a new bomb is placed in the random square. If there is already a bomb in the that square it tries to find other random square with no bomb on it. Once this change is made, the game proceeds as if the initial clicked square was empty. This is done to ensure that the player will not lose on their very first click.

  **Possible feature to add in future**

  - [] Add feature where user can change name in the input and that name would be displayed in the leader board scores. That enable to distinguish different players for competitive gameplay. **GameLeaderboard.js** is prepared to accept user name parameter in the addHighScoreLS method. Its default value is set to "User" if user name is not provided.

### App Design

- used Coolors for creating color scheme: <br>

  - The game should have pleasant and vibrant colors, therefore I have used shades of most common colors using a split [complimentary approach](http://www.paletton.com/wiki/index.php?title=Split_complementary_color_scheme) of the color theory and manually customising it to fit the needs of the application. The colors chosen are "Space Cadet" (#2B2D42), "Honey Yellow" (#F7B32B), "Verdigris" (#42B3B1), Amaranth Red (#D90429).
    <img width="618" alt="Lighthouse audit result for desktop screen size" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/color-palette.png">

- Google fonts: main font - Ubuntu
- Utilized CSS Reset shared by [Andy Bell](https://piccalil.li/blog/a-modern-css-reset/).
- Used CSS custom properties (variables) to avoid DRY principle. Also provided me with easy way for manipulating HTML elements with use of JavaScript. </br>
  Example of dynamic board generation (rowsCount and colsCount variables are set depending on the game difficulty chosen by the user and the board's size is dictated by those values):
  ```javascript
  gameBoard.style.setProperty('--rows', this.rowsCount);
  gameBoard.style.setProperty('--cols', this.colsCount);
  ```
- CSS styles developed Desktop first as the game is targeted mostly to PC/Desktop gamers. But game is fully responsive and playable on smaller devices (mobiles, tablets).
- Text selection changes it to red color to match "exploding" theme.

### **Mobile Functionality**

For the mobile devices / tablets the game is utilizing built in functionality where **one tap** on the device's screen is equivalent to the LMB (left mouse button) click and **press and hold** on the device's screen is equivalent to the RMB (right mouse button).

# **rough notes** (early development only!)

## **Possible features to add in future:**

- Add feature where user can change name in the input and that name would be displayed in the leader board scores. That enable to distinguish different players for competitive gameplay. **GameLeaderboard.js** is prepared to accept user name parameter in the addHighScoreLS method. Its default value is set to "User" if user name is not provided.
- Extra feature hardcore mode with the timer counting to zero and explode bombs if not game is not finished before time is over, that would set difficulty on another level.
- For hardcore mode change colors of the game to more aggressive.
