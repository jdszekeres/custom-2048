window.grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
let score = 0;
let high_score = config.options.saveHighScore ? parseInt(localStorage.getItem(config.options.HighScoreKey)) || 0 : 0;
const randint = (start, end) => Math.floor(Math.random() * end - start) + start
const rand_tile = () => randint(0, 3)
const new_tile = () => randint(0, 10) === 9 ? 4 : 2


window.grid[rand_tile()][rand_tile()] = new_tile() // create a starting tile

const add_random_tile = (grid) => {
    const avail = grid.flatMap((row, i) => row.map((val, j) => val === 0 ? [i, j] : null).filter(Boolean));
    if (avail.length === 0) {
        throw new Error("Game Over")
    }
    let rand = rand_tile(0, avail.length - 1);
    if (rand >= avail.length) {
        rand = 0;
    }
    const tile = avail[rand];

    grid[tile[0]][tile[1]] = new_tile()

    window.grid = grid;

}

document.addEventListener('keydown', keyPressHandler);

function keyPressHandler(e) {
    const prevTiles = structuredClone(grid)

    const eq = a => b => a === b;
    switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":



            let result = move(window.grid, e.key);
            newGrid = result.grid;
            score += result.score;
            const b = [move(structuredClone(newGrid), 'ArrowRight').grid, move(structuredClone(newGrid), 'ArrowDown').grid];
            const avail = structuredClone(newGrid).flatMap((row, i) => row.map((val, j) => val === 0 ? [i, j] : null).filter(Boolean));
            if (arrayDeepCompare(eq)(b[0])(b[1]) && arrayDeepCompare(eq)(b[1])(structuredClone(newGrid)) && avail.length === 0) {
                // no possible moves
                document.removeEventListener('keydown', keyPressHandler);
                document.getElementById('game-over').style.zIndex = 100;
                document.getElementById('game-over').style.animation = 'fade-in 800ms ease 1200ms'
                setTimeout(() => document.getElementById('game-over').style.opacity = 1, 1200)
            }
            break;

        default:
            return;
    }

    // Check if move changed board. If so, add new random tile.
    const nothingHappened = arrayDeepCompare(eq)(prevTiles)(newGrid);
    update_grid(newGrid);
    if (!nothingHappened) {
        try {
            add_random_tile(newGrid);
        } catch (e) {
        }
    }
    setTimeout(() => update_grid(newGrid), 1) // go twice so we merge then update

    setTimeout(() => {
        if (config.options.animate) {
            const newTilePos = getNewTilePosition(prevTiles, newGrid); // Detect where the new tile was added
            if (newTilePos) {
                const newTileElement = document.getElementById(`${newTilePos[0]}-${newTilePos[1]}`).childNodes[0];

                newTileElement.classList.add('new-tile');
            }

            const mergedTiles = getMergedTiles(prevTiles, newGrid); // Detect merged tiles
            mergedTiles.forEach(([i, j]) => {
                const mergedTileElement = document.getElementById(`${i}-${j}`).childNodes[0];
                mergedTileElement.classList.add('merge-tile');
            });
        }
    }, 50);
}

const update_grid = (grid) => {
    window.grid = grid;
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            const val = grid[i][j]
            if (val !== 0) {
                const img = config.images[val]
                document.getElementById(`${i}-${j}`).innerHTML = img ? `<img class="tile tile-${val}" src="images/${img}" ${config.options.showNumberOnHover ? "title='" + val + "'" : ""}/>` : `<div class='tile tile-${val}'>${val}</div>`
            } else {
                document.getElementById(`${i}-${j}`).innerHTML = "";
            }
        }
    }
    textFit(document.querySelectorAll('div.tile'), { alignHoriz: true, alignVert: true });
    document.getElementById('current-score').textContent = score.toLocaleString();

    if (high_score < score) {
        high_score = score;
        if (parseInt(localStorage.getItem(config.options.HighScoreKey)) < high_score) {
            localStorage.setItem(config.options.HighScoreKey, high_score);
        }
    }
    document.getElementById('high-score').textContent = high_score.toLocaleString();

}

update_grid(grid);
