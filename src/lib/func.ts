export const _toTitleCase = (value:string) => {
    if (value.trim() === '') return '';
  let str2 = [];
  str2 = value.toLowerCase().split(' ');
  for (var i = 0; i < str2.length; i++) {
    str2[i] = str2[i].charAt(0).toUpperCase() + str2[i].slice(1);
  }
  return str2.join(' ');
}