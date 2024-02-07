import sketch from '../../public/images/icons/extensions/sketch.svg';
import word from '../../public/images/icons/extensions/word.svg';
import csv from '../../public/images/icons/extensions/csv.svg';
import pdf from '../../public/images/icons/extensions/pdf.svg';
import presentation from '../../public/images/icons/extensions/presentation.svg';
import png from '../../public/images/icons/extensions/png.svg';
import jpg from '../../public/images/icons/extensions/jpg.svg';
import folder from '../../public/images/icons/extensions/folder.svg';
import worldWideWeb from '../../public/images/icons/extensions/www.svg';
import anyImage from '../../public/images/icons/extensions/image.svg';
import Others from '../../public/images/icons/extensions/other.svg';

export const _toTitleCase = (value:string) => {
    if (value.trim() === '') return '';
  let str2 = [];
  str2 = value.toLowerCase().split(' ');
  for (var i = 0; i < str2.length; i++) {
    str2[i] = str2[i].charAt(0).toUpperCase() + str2[i].slice(1);
  }
  return str2.join(' ');
}


export const validateEmail = (email:string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};




// todo find icon set to support main extensions

export const fileExtensionImages: { [key: string]: any } = {
  sketch: sketch,
  doc: word,
  docx: word,
  key: presentation,
  ppt: presentation,
  pptx: presentation,
  csv: csv,
  xls: csv,
  xlsx: csv,
  xlsm: csv,
  png: png,
  PNG: png,
  jpg: jpg,
  image: anyImage,
  web: worldWideWeb,
  JPEG: jpg,
  jpeg: jpg,
  pdf: pdf,
  webp: png,
  other: Others
};

export const folderImage = folder;