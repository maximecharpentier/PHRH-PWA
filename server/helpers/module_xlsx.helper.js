const XLSX = require('xlsx')

class module_xlsx {

  constructor(path) {
    let tmpArr = path.split('\\')
    this.fileName = tmpArr[tmpArr.length - 1]
    this.fileReader = XLSX.readFile(path)
    this.currentSheet = null
  }

  getFirstSheetName() {
    return this.fileReader.SheetNames[0]
  }

  getFileName() {
    return this.fileName
  }

  setCurrentSheet(sheet) {
    if(!this.currentSheet) {
      this.currentSheet = sheet
    }
  }

  setFirstSheetAsCurrentSheet() {
    let firstSheetName = null, sheet = null
    //get first sheet name
    if(this.fileReader) {
      firstSheetName = this.getFirstSheetName()
    }
    //get first sheet from name
    if(firstSheetName) {
      sheet = this.getSheetFromSheetName(firstSheetName)
    }
    //set current sheet
    if(sheet) {
      this.setCurrentSheet(sheet)
    }
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

  filterLine(col, valueToFind) {
    const line = 1
    let isNotFound = true
    //pour chaque col+ligne
    while (isNotFound) {
      if(this.getCellValue(col+line) === null) break
      if(this.getCellValue(col+line) == valueToFind) isNotFound = false
      line++
    }

    if(!isNotFound) {
      return line
    }
    else{
      return this.LINE_NOT_FOUND
    }
  }
}

module_xlsx.LINE_NOT_FOUND = 1

module.exports = module_xlsx;
