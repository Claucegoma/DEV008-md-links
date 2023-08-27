const fs = require("fs");
const path = require("path");
const api = require("../api.js");

//test si la ruta existe
describe("isPathValid", () => {
  it("debería devolver true si la ruta existe", () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md";
    const result = api.isPathValid(filePath);
    expect(result).toBe(true);
  });

  it("debería devolver false si la ruta no existe", () => {
    const filePath = "ruta\\invalida\\archivo.txt";
    const result = api.isPathValid(filePath);
    expect(result).toBe(false);
  });
});

//test si la ruta es relativa o absoluta
describe("convertToAbsolute", () => {
  it("debería devolver una ruta absoluta si ya es absoluta", () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md";
    ("C:\\ruta\\absoluta\\archivo.txt");
    const result = api.convertToAbsolute(filePath);
    expect(result).toBe(filePath);
  });

  it("debería devolver una ruta absoluta si es relativa", () => {
    const relativePath = "ruta\\relativa\\archivo.txt";
    const expectedAbsolutePath = path.join(process.cwd(), relativePath);
    const result = api.convertToAbsolute(relativePath);
    expect(result).toBe(expectedAbsolutePath);
  });
});

//test para verificar si es archivo
describe("isFile", () => {
  it("should return true for an existing file", () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md";
    const result = api.isFile(filePath);
    expect(result).toBe(true);
  });
  it("should return false for a non-existing file", () => {
    const filePath = "this\\archivo\\noesarchivo.md";
    const result = api.isFile(filePath);
    expect(result).toBe(false);
  });
});

//test si es archivo MD
describe("fileMd", () => {
  it("debería devolver true si es archivo MD", () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md";
    const result = api.fileMd(filePath);
    expect(result).toBe(true);
  });

  it("debería devolver false si no es archivo MD", () => {
    const filePath = "nonexisting\\this\\file.txt";
    const result = api.fileMd(filePath);
    expect(result).toBe(false);
  });
});

//test para leer archivos y ver si tiene links
describe("readFile function", () => {
  it("should read the content of an existing file", async () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\noLinks.md";
    const expectedContent =
      "Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.";
    const content = await api.readFile(filePath, "utf-8");
    expect(content).toBe(expectedContent);
  });

  it("should reject with an error for a non-existing file", async () => {
    const filePath = "nonExistingFile.txt";

    await expect(api.readFile(filePath, "utf-8")).rejects.toThrow();
  });
});

//test sobre la función getlinks
describe("getLinks function", () => {
  it("should return an array of links from a file containing links", async () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\withLinks.md";
    const expectedLinks = [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
        file: filePath,
      },
      {
        href: "https://nodejs.org/",
        text: "Node.js",
        file: filePath,
      },
      {
        href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
        text: "md-links",
        file: filePath,
      },
      {
        href: "https://nodejs.org/es/",
        text: "Node.js",
        file: filePath,
      },
      {
        href: "https://developers.google.com/v8/",
        text: "motor de JavaScript V8 de Chrome",
        file: filePath,
      },
    ];

    const links = await api.getLinks(filePath);
    expect(links).toEqual(expectedLinks);
  });

  it("should return an empty array for a file without links", async () => {
    const filePath =
      "C:\\Users\\ceci_\\OneDrive\\Escritorio\\MDLINKS Dev008\\DEV008-md-links\\filesExamples\\noLinks.md";

    const links = await api.getLinks(filePath);
    expect(links).toEqual([]);
  });

  it("should reject with an error for a non-existing file", async () => {
    const filePath = "non\\Existing\\File.md";

    await expect(api.getLinks(filePath)).rejects.toThrow();
  });
});
