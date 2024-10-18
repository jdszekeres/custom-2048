function slideRowLeft(row) {
    // Remove all zeros
    let nonZero = row.filter(num => num !== 0);

    // Merge adjacent tiles if they are the same
    for (let i = 0; i < nonZero.length - 1; i++) {
        if (nonZero[i] === nonZero[i + 1]) {
            nonZero[i] *= 2; // Double the value
            nonZero[i + 1] = 0; // Mark the next tile as "merged"
        }
    }

    // Remove the newly formed zeros after merging
    nonZero = nonZero.filter(num => num !== 0);

    // Fill the rest of the row with zeros
    while (nonZero.length < 4) {
        nonZero.push(0);
    }

    return nonZero;
}


function moveLeft(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i] = slideRowLeft(grid[i]);
    }
    return grid;
}

function moveRight(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i] = slideRowLeft(grid[i].reverse()).reverse();
    }
    return grid;
}


function transpose(grid) {
    return grid[0].map((_, i) => grid.map(row => row[i]));
}

function moveUp(grid) {
    grid = transpose(grid);
    moveLeft(grid);
    return transpose(grid);
}

function moveDown(grid) {
    grid = transpose(grid);
    moveRight(grid);
    return transpose(grid);
}



function move(grid, key) {
    switch (key) {
        case 'ArrowUp':
            return moveUp(grid);
        case 'ArrowDown':
            return moveDown(grid);
        case 'ArrowLeft':
            return moveLeft(grid);
        case 'ArrowRight':
            return moveRight(grid);

        default: return grid;
    }
}