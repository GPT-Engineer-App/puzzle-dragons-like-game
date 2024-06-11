import React, { useState, useEffect } from "react";
import { Container, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { FaGem } from "react-icons/fa";

const BOARD_SIZE = 8;
const COLORS = ["red", "blue", "green", "yellow", "purple"];

const generateBoard = () => {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      row.push(randomColor);
    }
    board.push(row);
  }
  return board;
};

const Index = () => {
  const [board, setBoard] = useState(generateBoard());
  const [selectedTile, setSelectedTile] = useState(null);

  const handleTileClick = (row, col) => {
    if (selectedTile) {
      // Swap tiles
      const newBoard = [...board];
      const temp = newBoard[row][col];
      newBoard[row][col] = newBoard[selectedTile.row][selectedTile.col];
      newBoard[selectedTile.row][selectedTile.col] = temp;
      setBoard(newBoard);
      setSelectedTile(null);
    } else {
      setSelectedTile({ row, col });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <SimpleGrid columns={BOARD_SIZE} spacing={1}>
        {board.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <Box key={`${rowIndex}-${colIndex}`} width="40px" height="40px" bg={color} display="flex" justifyContent="center" alignItems="center" border={selectedTile && selectedTile.row === rowIndex && selectedTile.col === colIndex ? "2px solid black" : "1px solid gray"} onClick={() => handleTileClick(rowIndex, colIndex)}>
              <FaGem color="white" />
            </Box>
          )),
        )}
      </SimpleGrid>
      <Button mt={4} onClick={() => setBoard(generateBoard())}>
        Reset Board
      </Button>
    </Container>
  );
};

export default Index;
