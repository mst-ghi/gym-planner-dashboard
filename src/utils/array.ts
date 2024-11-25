export const groupBy = <T>(arr: T[], key: keyof T) => {
  const group = [];

  const groupReduce = arr.reduce((acc: any, cVal) => {
    const property = cVal[key];
    acc[property] = [...(acc[property] || []), cVal];
    return acc;
  }, {});

  for (const groupKey of Object.keys(groupReduce)) {
    group.push({
      property: groupKey,
      items: groupReduce[groupKey],
    });
  }

  return group;
};

export const isEmptyObject = <T>(obj: T) => {
  return (obj && Object.keys(obj).length === 0 && obj.constructor === Object) || obj === undefined;
};

export const isNotEmptyObject = <T>(obj: T) => !isEmptyObject(obj);

export const isEmptyArrayObject = <T>(arr: T[]) => {
  if (arr) {
    return arr[0] === undefined;
  } else {
    return true;
  }
};

export const sortData = <T>(
  data: T[],
  keyToSort: keyof T,
  direction: 'asc' | 'desc' | 'none' = 'asc',
) => {
  if (direction === 'none') {
    return data;
  }
  const compare = (objectA: T, objectB: T) => {
    const valueA = objectA[keyToSort];
    const valueB = objectB[keyToSort];

    if (valueA === valueB) {
      return 0;
    }

    if (valueA > valueB) {
      return direction === 'asc' ? 1 : -1;
    } else {
      return direction === 'asc' ? -1 : 1;
    }
  };

  return data.slice().sort(compare);
};
