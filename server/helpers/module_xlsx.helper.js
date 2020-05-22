const XLSX = require('xlsx')

class module_xlsx {

  constructor(path) {
    let tmpArr = path.split('\\')
    this.fileName = tmpArr[tmpArr.length - 1]
    this.fileReader = XLSX.readFile(path)
    this.currentSheet = null
  }

  getNbLines() {
    const range = XLSX.utils.decode_range(this.currentSheet['!ref'])
    return range.e.r
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
    let line = 1
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

  async forEachLine(beginLine, stop_at, f) {
    if(!f){
      return this.CALL_BACK_MANQUANT
    }
    else{
      let line = beginLine
      const length = stop_at ? stop_at : (this.getNbLines() + 1)
      for(line = beginLine; line <= length; line ++){
        console.log(line)
        f(line)
      }
    }
  }
}

module_xlsx.LINE_NOT_FOUND = 1
module_xlsx.BEGIN_COL_LETTER = 'A'
module_xlsx.END_OF_FILE = 'EOF'
module_xlsx.CALL_BACK_MANQUANT = 'La fonction de call back est manquante'

module.exports = module_xlsx;
