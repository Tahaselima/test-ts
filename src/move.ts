// Please update this type as same as with the data shape.

type List = Array<Files>;

interface Files extends File {
  files: Array<File>;
}

interface File {
  id: string;
  name: string;
}

export default function move(list: List, source: string, destination: string): List {
  const findSource =
    list.find((item) => item.files.some((file) => file.id === source)) ||
    (() => {
      throw new Error('You cannot move a folder');
    })();
  const findDestination =
    list.find((item) => item.id === destination) ||
    (() => {
      throw new Error('You cannot specify a file as the destination');
    })();
  if (!findDestination.files.find((item) => item.id === source))
    findDestination.files.push(findSource.files.filter((filex) => filex.id === source)[0]);
  return list.map((item) => {
    return {
      ...item,
      files:
        item.id !== destination ? item.files.filter((itemx) => itemx.id !== source) : item.files,
    };
  });
}
