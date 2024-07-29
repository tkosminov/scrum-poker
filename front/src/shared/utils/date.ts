export function toStrDate(date: Date) {
  let str = '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  str += year;

  str += month < 10 ? `.0${month}` : `.${month}`;
  str += day < 10 ? `.0${day}` : `.${day}`;

  return str;
}
