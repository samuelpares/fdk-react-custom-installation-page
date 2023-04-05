function getNotEmpty(obj) {
  const newObj = {};

  for (const prop in obj) {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  }

  return newObj;
}

const utils = {
  getNotEmpty
}

window.utils = utils