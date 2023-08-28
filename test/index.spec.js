const fs = require("fs");
const path = require("path");
const { mdLinks }= require("../index.js");
const { getStatus } = require('../libAxio.js');

const { convertToAbsolute, fileMd, getLinks } = require('../api.js');


jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('../api.js', () => ({
  convertToAbsolute: jest.fn(),
  fileMd: jest.fn(),
  getLinks: jest.fn(),
}));

jest.mock('../libAxio.js', () => ({
  getStatus: jest.fn(),
}));

describe('mdLinks', () => {
    it('debería rechazar con un error si la ruta no existe', () => {
        const absolutePath = "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md";
        fs.existsSync.mockReturnValue(false);
      
        convertToAbsolute.mockReturnValue(absolutePath); // Configuración del mock
      
        return mdLinks('ruta\\no\\existente.md')
          .catch(error => {
            expect(error.message).toBe('La ruta no existe ' + absolutePath);
          });
      });
  

  it('debería rechazar con un error si el archivo no es Markdown', () => {
    fs.existsSync.mockReturnValue(true);
    fileMd.mockReturnValue(false);

    return mdLinks("C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\noLinks.md")      .catch(error => {
        expect(error.message).toBe('El archivo no es Markdown');
      });
  });

  it('debería resolver con los enlaces si no se debe validar', () => {
    fs.existsSync.mockReturnValue(true);
    fileMd.mockReturnValue(true);
    getLinks.mockResolvedValue(['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/']);

    return mdLinks('C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md')
      .then(result => {
        expect(result).toEqual(['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/']);
      });
  });

  it('debería resolver con los resultados de validación si se debe validar', () => {
    fs.existsSync.mockReturnValue(true);
    fileMd.mockReturnValue(true);
    getLinks.mockResolvedValue(['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/']);
    getStatus.mockResolvedValue([
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', status: 200 },
      { href: 'https://nodejs.org/', text: 'Node.js', status: 200 }
    ]);

    return mdLinks( "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md", { validate: true })
      .then(result => {
        expect(result).toEqual([
            { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', status: 200 },
            { href: 'https://nodejs.org/', text: 'Node.js', status: 200 }
        ]);
      });
  });
});






