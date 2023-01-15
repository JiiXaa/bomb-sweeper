[Back to Main README](https://github.com/JiiXaa/bomb-sweeper#testing)

# Testing

## Contents

The Bomb Sweeper game has been tested the following criteria:

- [Lighthouse Audit](#lighthouse)
- [Code Validation](#code-validation)
  - [W3C HTML Validator](#w3c-html-validator)
  - [W3C CSS Validator](#w3c-css-validator)
  - [Usability Testing](#usability-testing)
- [Browser Compatibility](#browser-compatibility)
- [Testing User Stories](#testing-user-stories)
- [Manual Testing](#manual-testing)

## Code Validation

## Lighthouse

I used lighthouse in chrome developer tools to test each of the pages for:

- Performance - how the page performs whilst loading.
- Accessibility - how accessible is the site for all users and how can it be improved.
- Best practices - how does the site conform to industry best practices.
- SEO - search engine optimization. Is the site optimized for search engine result rankings.

#### Desktop / Mobile

<img width="476" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/lighthouse-results.png">

[Back to contents](#contents)

### W3C HTML Validator

**All HTML markup elements passed the W3C HTML validator without errors.**

<img width="476" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/html-validation.jpg">


### W3C CSS Validator

<img width="600" src="https://raw.githubusercontent.com/JiiXaa/bomb-sweeper/main/.github/screenshots/css-validation.jpg">

**All styles passed the CSS validator without errors.**

### Usability Testing
- To test the ease of navigation and game play, this application was shared with few friends of different ages and different levels of computer/mobile device knowledge. There were no issues identified regarding the simplicity of navigating the game.
- The testers also verified that all buttons, links, game logic work correctly, intuitively and as expected.

## Browser Compatibility

- Browser Compatibility
    | Screen size\Browser | Safari           | Opera            | Microsoft Edge   | Chrome           | Firefox          | Internet Explorer |
    | --------------------|:----------------:|:----------------:|:----------------:|:----------------:|:----------------:|:-----------------:|
    | Mobile              |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:| Not Tested        |
    | Desktop             |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:| Not Tested        |
    | Tablet              |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:| Not Tested        |


- The website was exhaustively tested for responsiveness on [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools). Different viewport sizes were simulated ranging from as small as iPhone 5 (320px) to large desktop sizes (1200px and above).

## Testing User Stories
- As a first time player, I want to know the game instructions/rules.
  - Game instructions are easily accessible from the main menu. The rules section contains a detailed explanation of how to play the game with appropriate images showing what to expect.
- As a player I want to be able to change game difficulty and reset it any time during the game.
  - Next to the game board on the right-hand side, there are buttons which change the game difficulty of the game with a click. Also when clicked: game, timer and user moves are reset.
- As a player I want to reset the game.
  - The game can be reset by clicking chosen game difficulty, and also by quitting to the main menu.
- As a player I want to be able to flag/unflag a cell with potentially hidden bomb.
  - User can flag or unflag a cell with the RMB (right mouse button)
- As a player I want to see how many bombs left after I have flagged some.
  - The side menu next to the game board has the element showing how many bombs are left after placing flags on the guessed squares.
- As a player, if bomb exploded I want to know position of remaining bombs, and my correctly predicted (flagged) ones.
   - The matter is addressed when a user loses the game by exploding a bomb game shows the position of the remaining bombs and correctly predicted (flagged) ones. Also, the bomb has exploded changes color to red.
- As a player, if win the game I want to know how many clicks and seconds it took to complete.
  - When the user wins the game, a pop-up shows how long it took (how many seconds), and how many moves it took.
- As a frequent player I want to be able to see and compare my previous scores.
  - The game tracks the 5 best scores for each difficulty (beginner, intermediate, expert) and can be seen in the Leader Board section of the game. Scores are stored in the localStorage.

## Manual Testing

- **Main Menu Section:** <br>
   All three buttons were clicked and checked if navigate to the proper section of the application. <br>
  [x] 'Play' button opens the game where player can start the game. <br>
  [x] 'Rules' button opens the rules section where user can find instructions/images how to play the game. <br>
  [x] 'Leaderboard' button opens the leaderboard section where best scores are displayed.
- **Game Section:** <br>
  [x] The left mouse click on the game board's square reveals either the number of surrounding bombs or exploded bombs if it happens to contain one of the hidden bombs. <br>
  [x] The right-click on the board's square places flag on it. If the cell already contains a flag, the flag gets removed instead. <br>
  [x] When game starts, timer starts counting from zero and stops when game is either win or lost. <br>
  [x] Every click (left mouse button) on the cell is getting added to moves count and displayed for user to see. <br>
  [x] The game tracks and displays how many flags are available to place and how many were already placed by the user. <br>
  [x] 'Beginner' button on left mouse click resets the game and set the difficulty of the game to beginner. <br>
  [x] 'Intermediate' button on left mouse click resets the game and set the difficulty of the game to intermediate. <br>
  [x] 'Expert' button on left mouse click resets the game and set the difficulty of the game to expert. <br>
  [x] 'Menu' button on the left mouse click opens the pop-up with information that quitting the game will result in losing a progress of the current game. Users can either accept and leave to the main menu or decline and go back to the game. <br>
  [x] ESC button pressed on keyboard opens the pop-up with information that quitting the game will result in losing a progress of the current game. <br>
- **Rules Section:** <br>
  [x] All images and game instruction are displayed correctly on desktop and mobile devices. <br>
  [x] 'Menu' button on left mouse click redirects the user to the main menu. <br>
  [x] ESC button pressed on keyboard redirects the user to the main menu. <br>
- **Leader Board Section:** <br>
  [x] Scores are stored in the localStorage for all 3 difficulties and displayed in the separate elements.
  [x] 'Back To Menu' button on left mouse click redirects the user to the main menu. <br>
  [x] ESC button pressed on keyboard redirects the user to the main menu. <br>

- Application's other features: <br>
  [x] The default text color when selected is replaced with a red shade. It works on every page.