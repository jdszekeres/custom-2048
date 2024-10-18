window.grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
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
    console.log(avail, tile, rand, avail.length - 1);

    grid[tile[0]][tile[1]] = new_tile()

    window.grid = grid;

}

document.addEventListener('keydown', keyPressHandler);

function keyPressHandler(e) {
    const prevTiles = structuredClone(grid)


    switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            newGrid = move(window.grid, e.key);
            break;

        default:
            return;
    }

    // Check if move changed board. If so, add new random tile.
    const nothingHappened = prevTiles.every((tile, index) => tile === [].concat(...newGrid)[index]);
    console.log(nothingHappened)
    if (!nothingHappened) {
        try {
            add_random_tile(newGrid);
        } catch (e) {
            alert("You lost")
        }
    }
    update_grid(newGrid);

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
                document.getElementById(`${i}-${j}`).innerHTML = img ? `<img class="tile" src="images/${img}" ${config.options.showNumberOnHover ? "title='" + val + "'" : ""}/>` : `<div class='tile'>${val}</div>`
            } else {
                document.getElementById(`${i}-${j}`).innerHTML = "";
            }
        }
    }
}

update_grid(grid);
