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

  /*async filterLine(col, valueToFind) {
    //pour chaque col+ligne retourner la ligne ou la valeur a été trouvée
    const lineFound = await this.forEachLine(1, null, (line) => {
      if(this.getCellValue(col+line) == valueToFind) {
        return line //on retourne afin de stopper le parcours de this.forEachLine()
      }
      else{
        return false
      }
    })
    //si ligne trouvée retouner la ligne
    if(lineFound) return lineFound
    //sinon retourner ligne non trouvée
    else return this.LINE_NOT_FOUND
  }*/

  async forEachLine(beginLine, stop_at, f) {
    if(!f){
      return this.CALL_BACK_MANQUANT
    }
    else{
      const length = stop_at ? stop_at : (this.getNbLines() + 1)
      let out = null //si la valeur out est set par la fonction de callback set alors c'est le signe que le parcours doit s'arrèter
      for(let line = beginLine; line <= length; line ++){
        out = await f(line)
        if(out) break //pour stoper le parcours quand f() le souhaite
      }
      //si la fonction de call back retourne un resultat alors retourner celui ci
      if(out) return out
      //sinon retourner que le parcours s'est bien effectué
      else return this.END_OF_FILE
    }
  }

  static getJSDateFromExcellDate(excellDateValue) {
    //JS : 1er Jan 1970
    //Excell : 1er Jan 1900
    //ecart : 25569 jours
    const dateConvertie = new Date(0)
    //retrancher jours pour avoir le nb de jour séparant la date excell du 1er Jan 1970 (et non du 1er Jan 1900)
    const nbJours = excellDateValue - 25569
    dateConvertie.setDate(dateConvertie.getDate() + nbJours)
        
    return dateConvertie
  }
}

module_xlsx.LINE_NOT_FOUND = 'null'
module_xlsx.BEGIN_COL_LETTER = 'A'
module_xlsx.END_OF_FILE = 'EOF'
module_xlsx.CALL_BACK_MANQUANT = 'La fonction de call back est manquante'

module.exports = module_xlsx;
