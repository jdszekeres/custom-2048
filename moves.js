function slideRowLeft(row, score) {
    let nonZero = row.filter(num => num !== 0);

    for (let i = 0; i < nonZero.length - 1; i++) {
        if (nonZero[i] === nonZero[i + 1]) {
            nonZero[i] *= 2; // Merge the tiles and double the value
            nonZero[i + 1] = 0; // Mark the next tile as merged
            score += nonZero[i]; // Add the merged value to the score
        }
    }

    nonZero = nonZero.filter(num => num !== 0);

    while (nonZero.length < 4) {
        nonZero.push(0);
    }

    return { row: nonZero, score };
}

// Function to move all rows to the left
function moveLeft(grid) {
    let score = 0;
    for (let i = 0; i < 4; i++) {
        let result = slideRowLeft(grid[i], score);
        grid[i] = result.row;
        score = result.score;
    }
    return { grid, score };
}

// Function to move all rows to the right
function moveRight(grid) {
    let score = 0;
    for (let i = 0; i < 4; i++) {
        let result = slideRowLeft(grid[i].reverse(), score);
        grid[i] = result.row.reverse(); // Reverse back after sliding
        score = result.score;
    }
    return { grid, score };
}

// Function to transpose the grid (switch rows and columns)
function transpose(grid) {
    return grid[0].map((_, i) => grid.map(row => row[i]));
}

// Function to move up
function moveUp(grid) {
    grid = transpose(grid);
    let result = moveLeft(grid);
    return { grid: transpose(result.grid), score: result.score };
}

// Function to move down
function moveDown(grid) {
    grid = transpose(grid);
    let result = moveRight(grid);
    return { grid: transpose(result.grid), score: result.score };
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

        default: return { grid, score: 0 };
    }
}