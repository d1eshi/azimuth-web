const XLSX = require('xlsx')
const fs = require('fs')

// Nombre del archivo .xlsx que deseas convertir
const inputFile = 'utils/census/CensusData.xlsx'

// Nombre de la hoja de trabajo (worksheet) que deseas convertir
const sheetName = 'Original'

// Cargar el archivo .xlsx
const workbook = XLSX.readFile(inputFile)

// Seleccionar la hoja de trabajo específica
const worksheet = workbook.Sheets[sheetName]

// Convertir la hoja de trabajo a un objeto JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet)

// Guardar el JSON en un archivo
const outputFile = 'censusdata.json'
fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf-8')

console.log(`La hoja "${sheetName}" del archivo ${inputFile} se ha convertido a ${outputFile}`)
