# custom-2048

## Configure the heck out of this game

### Options

#### All options are available in the `config.js` and `config.css` file

##### JS

- `images` - Custom images to use in place of tiles
- `options` - General settings including
  - `animate` - Show css animations on movement
  - `showNumberOnHover` - Show tile number on custom images when hovering
  - `saveHighScore` - dictates whether to save the high score to local storage
  - `HighScoreKey` - is the key that is used to save the high score to local storage

##### CSS

- `body` - Background color / image / ... of the site
- `--grid-size` - The size of the 2048 table for both landscape and portrait pages
- `.tile-xxx` - The background colors of each number
- `.tile` - Font config for each tile
