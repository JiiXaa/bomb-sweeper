# Bomb Sweeper

<img width="960" alt="Responsive showcase screenshot" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/amiresponsive.jpg">

**Link to** **[live site](https://jiixaa.github.io/bomb-sweeper/)**

## About

Bomb Sweeper is a game where you have to find all the bombs on the board. The game is played on a grid of squares. Some squares contain bombs, others don't. If you click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs) you win. Clicking a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. Use this information plus some guess work to avoid the bombs. To reveal a square, left-click on it. To mark a square you think is a bomb, use right-click. </br> </br>
Game has three difficulties with following board setup: </br>
**Beginner:** 8 / 8 squares with 10 hidden bombs. </br>
**Intermediate:** 16 / 16 squares with hidden 40 bombs. </br>
**Expert:** 16 / 30 squares with 99 hidden bombs.

## Contents

- [**User Experience**](#user-experience)

  - [**User Stories**](#user-stories)

- [**Design Choices**](#design-choices)

  - [**OOP Approach**](#oop-approach)
  - [**Pseudocode**](#pseudocode)
  - [**App Design**](#app-design)
  - [**Mobile Functionality**](#mobile-functionality)

- [**Technologies Used**](#technologies-used)
- [**Possible features to add in future**](#possible-features-to-add-in-future)
- [**Testing**](#testing)
- [**Deployment**](#deployment)
- [**Credits**](#credits)

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

[Back to contents](#contents)

## Design Choices

### OOP Approach

Class based project (Object Oriented Programming paradigm) seemed to be good choice because:
- code is cleaner, functions (methods) are stored in objects,
- it provides encapsulation thus better readability,
- 'Strict Mode' out of the box,
- Good practice.

The game is developed as a SPA (single page application), and navigating through the game is controlled by JavaScript.

### Pseudocode

1. [x] Create Initial Utility Class (**LayerControl.js**) with features:

- [x] selecting element from the DOM for easy manipulation,
- [x] toggle of the elements visibility,

2. [x] Create Main Menu Class with features:

- [x] Load Game depending on difficulty set by the user
  - [x] Used Google Search to find rules of minesweeper for difficulty levels: <br>
        "There are three difficulty levels for Minesweeper: beginner, intermediate, and expert. Beginner has a total of ten mines and the board size is either 8 × 8, 9 × 9, or 10 × 10. Intermediate has 40 mines and also varies in size between 13 × 15 and 16 × 16. Finally, expert has 99 mines and is always 16 × 30 (or 30 × 16)."
- [x] Options, where user can change level of difficulty (default set to beginner)

  - **Possible feature to add in future**:
  - [] A hardcore mode with the timer counting down to zero and exploding bombs if the game is not finished before time is over. That would set the difficulty on another level.
  - [] For hardcore mode change colors of the game to more aggressive theme.

3. [x] Game Logic Class

- [x] Create game board depending on board size and bomb count set by user.
- [x] Left Mouse Click on a board's cell reveals either bomb (that ends the game) or number showing how many bombs are around that cell.
- [x] Right Mouse Button on a board's cell marks the user choice/prediction for bomb location
- Win/Lose condition:
  - [x] **lose**: when user click on the cell with bomb - reveal all bombs for user to see their locations.
    - [x] also show "lose" paragraph on the screen
  - [x] **win** after all bombs are marked correctly and rest of cell's are revealed.
    - [x] also show "win" paragraph on the screen
- [x] Show how many bombs are selected/guessed (count shown with flag emoji, decreasing/increasing depending on the user selection)
- [x] New Game Buttons for all three difficulties (reset whole game)
- [x] Game tracks player moves count and time of the current game (in seconds). Data is displayed for user to see.
- [x] Developer Mode: when the key sequence 'bombs' is pressed, it shows/highlights bombs locations. It was primarily implemented to speed up the development process but I also wanted to add it as it reminds me of old game cheat codes.

  It is possible to clear highlighted bombs with the key sequence: 'clear'.
- [x] Leader board is stored in localStorage to persist 5 best scores for each difficulty.
  - [x] Display scores on the LeaderBoard page (component) for user to see previous scores.
- [x] **First click never can be a bomb hit:** <br>
      The game board is generated randomly before the player clicks any squares. If the player happens to click a bomb square on their very first click, the bomb at this square is removed and a new bomb is placed in the random square. If there is already a bomb in that square, game tries to find other random square with no bomb on it. Once this change is made, the game proceeds as if the initial clicked square was empty. This is done to ensure that the player will not lose on their very first click.

  **Possible feature to add in future**

  - [] Add feature where user can change name in the input and that name would be displayed in the leader board scores. That enable to distinguish different players for competitive gameplay. **GameLeaderboard.js** is prepared to accept user name parameter in the addHighScoreLS method. Its default value is set to "User" if user name is not provided.

  [Back to contents](#contents)

### App Design

- #### **Color scheme**

  - used Coolors for creating color scheme: <br>

    The game should have pleasant and vibrant colors, therefore I have used shades of most common colors using a split [complimentary approach](http://www.paletton.com/wiki/index.php?title=Split_complementary_color_scheme) of the color theory and manually customising it to fit the needs of the application. The colors chosen are "Space Cadet" (#2B2D42), "Honey Yellow" (#F7B32B), "Verdigris" (#42B3B1), Amaranth Red (#D90429). </br> </br>
    <img width="618" alt="Color palette chosen for the application" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/color-palette.png">

  [Back to contents](#contents)

- #### **Typography**

  - Used Google fonts: </br>
    main font - 'Ubuntu' </br>
    <img width="142" alt="Ubuntu font sample" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/font-menu.png"> </br>
    game's board font - 'Press Start 2P'</br>
    <img width="170" alt="Press Start 2P font sample" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/font-game.png">

  [Back to contents](#contents)

- #### **Imagery**

  - All images are used only in the 'Rules' section of the game. These are screenshots of the actual game, added purely to complement the rules text explanation as a visual representation of the parts of the game. </br>

    Example screenshot image: </br>
    <img width="1522" alt="Expert board game in progress" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/img/expert-board.png"> </br></br>

  [Back to contents](#contents)

- #### **Technical design decisions**

  - The whole application is very simple from the design perspective, it only needed three components: 'game', 'rules' and 'leader board'. Because of that, I have decided to develop it as a SPA (single-page application). JavaScript is used to manipulate the HTML elements and render the relevant content to the user. The user is provided with easy and intuitive ways to navigate between the game's elements with the use of buttons indicating their purpose.
    </br></br>
    Quit to menu from the game screen: </br>
    <img width="425" alt="Quit to menu from game level example" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/quit-example.png"> </br></br>
    When user press the menu button confirmation pop-up is shown: </br>
    <img width="567" alt="Quit to menu confirmation pop-up" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/quit-confirmation.png"> </br></br>
    Also the user can use 'ESC' key to leave current page and 'main menu' is shown.
  - Utilized CSS Reset shared by [Andy Bell](https://piccalil.li/blog/a-modern-css-reset/).
  - Used CSS custom properties (variables) to avoid DRY principle. Also provided me with easy way for manipulating HTML elements with use of JavaScript. </br>
    Example of dynamic board generation (rowsCount and colsCount variables are set depending on the game difficulty chosen by the user and the board's size is dictated by those values):

  ```javascript
  gameBoard.style.setProperty('--rows', this.rowsCount);
  gameBoard.style.setProperty('--cols', this.colsCount);
  ```

  - CSS styles are developed 'Desktop' first as the game is targeted mostly to PC/Desktop gamers. But game is fully responsive and playable on smaller devices (mobiles, tablets).
  - Text selection changes it to red color to match "exploding" theme.
    <img width="425" alt="Page text selection example" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/text-selection.png"> </br>

### **Mobile Functionality**

For the mobile devices / tablets the game is utilizing built in functionality where **one tap** on the device's screen is equivalent to the LMB (left mouse button) click and **press and hold** on the device's screen is equivalent to the RMB (right mouse button).

[Back to contents](#contents)

## Technologies Used

[HTML5](https://en.wikipedia.org/wiki/HTML5) <br>
[CSS](https://en.wikipedia.org/wiki/CSS) <br>
[JavaScript](https://www.javascript.com/) <br>

## Possible features to add in future:

- **First to address:** One of the biggest challenges was to implement the game's board CSS styles for mobile devices as the board is quite big on the 'intermediate' and 'expert' difficulties. For both difficulties shortest length of the board is 16 squares. To fit the whole board on all mobile devices I have set the cell size to '21px' which seems a little bit small. The project was mainly focused towards practising JavaScript and not on the design thus I decided to leave it for future application upgrades.
- Add feature where user can change name in the input and that name would be displayed in the leader board scores. That enable to distinguish different players for competitive gameplay. **GameLeaderboard.js** is prepared to accept user name parameter in the addHighScoreLS method. Its default value is set to "User" if user name is not provided.
- Extra feature hardcore mode with the timer counting to zero and explode bombs if not game is not finished before time is over, that would set difficulty on another level.
- For hardcore mode change colors of the game to more aggressive.

## Testing

Full testing process and results can be found [here](https://github.com/JiiXaa/bomb-sweeper/blob/main/docs/TESTING.md).

## Deployment

### Publishing

This website was published using [GitHub Pages](https://pages.github.com/). The procedure is outlined below.

1. Go to the GitHub website and log in.
2. On the left-hand side, you'll see all your repositories, select the appropriate one. ([Repository](https://github.com/JiiXaa/bomb-sweeper) used for this project).
3. Under the name of your chosen Repository you will see a ribbon of selections, click on 'Settings' located on the right hand side.

<img width="600" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/pages.png">

4. Scroll down until you see 'GitHub Pages' heading.
5. Under the 'Source' click on the dropdown and select 'master branch'
6. The page will reload and you'll see the link of your published page displayed under 'GitHub' pages.
7. It takes a few minutes for the site to be published, wait until the background of your link changes to a green color before trying to open it.

### Forking

If you wish to contribute to this website you can Fork it without affecting the main branch by following the procedure outlined below.

1. Go to the GitHub website and log in.
2. Locate the [Repository](https://github.com/JiiXaa/bomb-sweeper) used for this project.
3. On the right-hand side of the Repository name, you'll see the 'Fork' button. It's located next to the 'Star' and 'Watch' buttons.

   <img width="350" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/fork.png">

4. This will create a copy in your personal repository.
5. Once you're finished making changes you can locate the 'New Pull Request' button just above the file listing in the original repository.

### Cloning

If you wish to clone or download this repository to your local device you can follow the procedure outlined below.

1. Go to the GitHub website and log in.
2. Locate the [Repository](https://github.com/JiiXaa/bomb-sweeper) used for this project.
3. Under the Repository name locate 'Clone or Download' button in green.

    <img width="350" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/clone.png">

4. To clone the repository using HTTPS click the link under "Clone with HTTPS".
5. Open your Terminal and go to a directory where you want the cloned directory to be copied in.
6. Type 'Git Clone' and paste the URL you copied from the GitHub.
7. To create your local clone press 'Enter'

<a name="bugs"></a>

## Known Bugs

There are no identified bugs as of now.
Constant manual tests were done as the features were added. Fixed, and checked with appropriate commit messages.

## Credits

- My mentor Dick Vlaanderen for his advice and guidance during this project.
- Google search engine for limitless resources about web development.
- [Stackoverflow](https://stackoverflow.com/) community for general advices and solution to problems I have encountered.

[Back to contents](#contents)
