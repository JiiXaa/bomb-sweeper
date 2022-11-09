# Bomb Sweeper

## design choices

#### Class based over Functional ?
  Class based project (OOP) seem to be good choice because:
    - Code is cleaner, functions (methods) are stored in objects.
    - Provides encapsulation thus better readability.
    - Strict Mode out of the box
    - Good exercise

### Pseudocode

1. [] Create Initial Utility Class with features:
  - [] selecting element from the DOM for easy manipulation,
  - [] toggle of the elements visibility,
2. [] Create Main Menu Class with features:
  - [] Load Game depending on set difficulty
    - [x] Used Google Search to find rules of minesweeper for difficulty levels: <br>
    "There are three difficulty levels for Minesweeper: beginner, intermediate, and expert. Beginner has a total of ten mines and the board size is either 8 × 8, 9 × 9, or 10 × 10. Intermediate has 40 mines and also varies in size between 13 × 15 and 16 × 16. Finally, expert has 99 mines and is always 16 × 30 (or 30 × 16)."
  - [] Options, where user can change level of difficulty (default set to beginner)
    - []  possible extra feature hardcore mode? with game with some kind of timer, that would set difficulty on another level.
3. [] Game Logic Class
  - [] Create game board depending on board size and bomb count set by user.
  - [] Left Mouse Click on a board's cell reveals either bomb (that ends the game) or number showing how many bombs are around that cell.
  - [] Right Mouse Button on a board's cell marks the user choice/prediction for bomb location
  - Win/Lose condition:
    - [] **lose**: when user click on the cell with bomb - reveal all bombs for user to see their locations.
      - [] also show "lose" paragraph on the screen (possible: change game's logo to red? / sound of the bomb?)
    - [] **win** after all bombs are marked correctly and rest of cell's are revealed.
      - [] also show "win" paragraph on the screen (possible: change game's logo to green? / sound for the win condition)
  - [] Show how many bombs are to select/guess (count of bombs emojis? 💣 💣 💣 | decreasing/increasing depending on the user selection)



