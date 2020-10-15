/* eslint-disable */
import XLSX from 'xlsx'

let FileSaver = require('file-saver')
export const commonExportExcel = (fileName, data) => {
    const defaultCellStyle = {font: {name: 'Verdana', sz: 11, color: 'FF00FF88'}, fill: {fgColor: {rgb: 'FFFFAA00'}}}
    const wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
      defaultCellStyle: defaultCellStyle,
      showGridLines: false
    }
    const wb = {
      SheetNames: ['Sheet1'], Sheets: {}, Props: {}
    }

    wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)

    // 创建二进制对象写入转换好的字节流
    let tmpDown = new Blob([s2ab(XLSX.write(wb, wopts))], {type: 'application/octet-stream'})
    FileSaver.saveAs(tmpDown, fileName)
  },

  s2ab = (s) => {
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    } else {
      let buf = new Array(s.length)
      for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
      return buf
    }
  }

