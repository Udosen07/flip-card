export const numberArraysReturnOne = (arrayLength, random) => {
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate a random number from 0 - 15
  const randomNumber = generateRandomNumber(random.min, random.max);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Original array of numbers from 1 to 16
  const originalArray = Array.from({ length: arrayLength }, (_, i) => i + 1);

  // Create an array of 16 arrays with shuffled numbers
  const arrayOfArrays = Array.from({ length: arrayLength }, () =>
    shuffleArray([...originalArray])
  );

  // Access the shuffled array using the random number generated
  const shuffledArray = arrayOfArrays[randomNumber];

  //   Output the shuffled array
  return { shuffledArray, originalArray: arrayOfArrays };
};

export const rearrangeArray = (shuffledArray, gameData) => {
  return shuffledArray.map((number) =>
    gameData.find((item) => item.id === number)
  );
};
