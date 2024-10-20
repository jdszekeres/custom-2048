const getNewTilePosition = (prevGrid, newGrid) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (prevGrid[i][j] === 0 && newGrid[i][j] !== 0) {
                return [i, j]; // Return the position of the new tile
            }
        }
    }
    return null;
};

const getMergedTiles = (prevGrid, newGrid) => {
    const merged = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (newGrid[i][j] !== 0 && prevGrid[i][j] !== newGrid[i][j]) {
                merged.push([i, j]); // Return positions where a merge happened
            }
        }
    }
    return merged;
};