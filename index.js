const { convertToAbsolute, fileMd, readFile, getLinks} = require('./api.js');
const { getStatus } = require('./libAxio.js');

//asincronía (librería nativa FS (FileSystem))//
const fs =require('fs');

//Funcion mdLinks
const mdLinks = (filePath, options = { validate: false }) => new Promise((resolve, reject) => {
  const shouldValidate = options.validate;
  //se convierte de relativa a absluta
  const absolutePath = convertToAbsolute(filePath);
  //  pathExist
  const pathExist = fs.existsSync(absolutePath);
  if (!pathExist) {
    return reject(new Error('La ruta no existe ' + absolutePath))
  }

  // check MDfile
  const isMdFile = fileMd(absolutePath);
  if (!isMdFile) {
    return reject(new Error('El archivo no es Markdown'))
  }
  getLinks(absolutePath)
    .then((links) => {
      if (!shouldValidate) {
        return resolve(links)
      }

      getStatus(links).then((respuesta) => {
        return resolve(respuesta)
      })
    })
    .catch((error) => {
      reject(error)
    }) 
})

// Llamada a la función mdLinks con un archivo y opciones
mdLinks('./filesExamples/withLinks.md', { validate: true }).then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

module.exports ={
  mdLinks
}


