const path = require('path');
const fs = require('fs');
const chalk= require('chalk');

//se valida si es una ruta existente//
const filePath = 'C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md'; 
const isPathValid = (filePath) => {
   if (fs.existsSync(filePath)) {
     return true;
   }else {
   return false;
 }
};
/*console.log(chalk.bold.blue(isPathValid(filePath)));
console.log(chalk.blue('Great! The path exist'));*/

//se valida si la ruta es relativa o absoluta.
//se resuelve la Ruta como absoluta (se convierte ruta relativa a absoluta)
function convertToAbsolute(filePath) {
   if (path.isAbsolute(filePath)) {
      return filePath;
      
   } else {
      const absolutePath = (path.join(process.cwd(), filePath));
      return absolutePath;
   }
};
/*console.log(chalk.bold.magenta(convertToAbsolute(filePath)));
console.log(chalk.magenta('Is a absolute path'));*/


//fs.statSync dice si es archivo o no
function isFile(filePath) {
   try {
      return fs.statSync(filePath).isFile();
   }catch (error) {
      if (error.code === 'ENOENT') {
         return false; // El archivo no existe, por lo tanto no es un archivo
      }
      throw error; // Manejar otros errores de manera adecuada
   }
}
/*console.log(chalk.bold.red(isFile(filePath)));
console.log(chalk.red('Perfect! it is a file'));*/


 //validar si es un archivo md
 const fileMd = (filePath) => {
    return (path.extname(filePath) === ".md");
 };
/*console.log(fileMd(filePath));*/


//Leer archivo (comprobar si tiene links)
const readFile = (filePath) => new Promise((resolve, reject) => {
   fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
         reject(error);
      } else {
         resolve(data);
      }
   });
});
//ver en consola
/*readFile(filePath)
   .then(data => {
      console.log(chalk.inverse.white('Contenido del archivo:'), data); // Aquí imprimes el contenido leído
   })
   .catch(error => {
      console.error('Error:', error);
   });*/

//obtener links
const getLinks = (filePath) => new Promise((resolve, reject) => {
   const newLinksMd = [];
   readFile(filePath).then((data) => {
      const regularExpression = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
      let match = regularExpression.exec(data);
      //si el archivo contiene Links debe retornar un array de links
      while (match != null) {
         newLinksMd.push({
            href: match[2],
            text: match[1],
            file: filePath,
         });
         match = regularExpression.exec(data);
      }
      resolve(newLinksMd);
   })
      .catch((error) => reject(error));
});

//ver en consola
// Llamada a la función getLinks
/*getLinks(filePath)
   .then(links => {
      // Imprimir los resultados en la consola
      if (links.length > 0) {
         console.log(chalk.inverse.yellowBright('Enlaces encontrados:'));
         links.forEach(link => {
            console.log('Text:', link.text);
            console.log('URL:', link.href);
            console.log('Archivo:', link.file);
            console.log('---');
            console.log(chalk.inverse.green('Links'))
         });
      } else {
         console.log('No se encontraron enlaces en el archivo.');
      }
   })
   .catch(error => {
      console.error('Error:', error);
   });*/



module.exports = {
   isPathValid,
   convertToAbsolute,
   fileMd,
   isFile,
   readFile,
   getLinks,
}