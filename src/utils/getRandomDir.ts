import getRandomInt from "utils/getRandomInt";

function getRandomDir() {
  let result = 0;

  while (result === 0) {
    result = getRandomInt(-1, 1);
  }

  return result;
};

export default getRandomDir;
