const fs = require('fs');
const path = require('path');
const api = require('../api.js'); 


//test si la ruta existe
describe('isPathValid', () => {
  it('debería devolver true si la ruta existe', () => {
    const filePath = 'C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md';
    const result = api.isPathValid(filePath);
    expect(result).toBe(true);
  });

  it('debería devolver false si la ruta no existe', () => {
    const filePath = 'ruta\\invalida\\archivo.txt';
    const result = api.isPathValid(filePath);
    expect(result).toBe(false);
  });
});
//test si la ruta es relativa o absoluta


describe('convertToAbsolute', () => {
  it('debería devolver una ruta absoluta si ya es absoluta', () => {
    const filePath ='C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md';'C:\\ruta\\absoluta\\archivo.txt';
    const result = api.convertToAbsolute(filePath);
    expect(result).toBe(filePath);
  });

  it('debería devolver una ruta absoluta si es relativa', () => {
    const relativePath = 'ruta\\relativa\\archivo.txt';
    const expectedAbsolutePath = path.join(process.cwd(), relativePath);
    const result = api.convertToAbsolute(relativePath);
    expect(result).toBe(expectedAbsolutePath);
  });
});

 //test para verificar si es archivo 
  describe('isFile', () => {
  it('should return true for an existing file', () => {
    const filePath = 'C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md';
    const result = api.isFile(filePath);
    expect(result).toBe(true);
  });
  it('should return false for a non-existing file', () => {
      const filePath = 'this\\archivo\\noesarchivo.md';
      const result = api.isFile(filePath);
      expect(result).toBe(false);
    });
  });

//test si es archivo MD
describe('fileMd', () => {
  it('debería devolver true si es archivo MD', () => {
    const filePath = 'C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md';
    const result = api.fileMd(filePath);
    expect(result).toBe(true);
  });

  it('debería devolver false si no es archivo MD', () => {
    const filePath ='nonexisting\\this\\file.txt';
    const result = api.fileMd(filePath);
    expect(result).toBe(false);
  });
});

