const XLSX = require('xlsx')

class module_xlsx {

  constructor() {
    this.fileReader = null
    this.currentSheet = null
  }

  readFile(fileName) {
    this.fileReader = XLSX.readFile('./datas/sources PHRH/Liste des hotels.xlsx')
  }

  setCurrentSheet(sheet) {
    this.currentSheet = sheet
  }

  getFirstSheetName() {
    return this.fileReader.SheetNames[0]
  }

  getSheetFromSheetName(sheetName) {
    const sheet = this.fileReader.Sheets[sheetName]
    if(sheet) {
      return sheet
    }
    else{
      console.log('echec du chargement de la sheet : '.sheetName)
    }
    
  }

  getCellValue(cellCoord) {
    if(this.currentSheet[cellCoord]) {
      return this.currentSheet[cellCoord].v
    }
    else{
      return null
    }
  }
}

module.exports = module_xlsx;
