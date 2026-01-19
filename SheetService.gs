/**
 * Sheet Service - All sheet-related operations
 */

/**
 * Get all sheets in the spreadsheet
 */
function getAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  return ss.getSheets().map(sheet => ({
    name: sheet.getName(),
    isActive: sheet.getName() === activeSheet.getName()
  }));
}

/**
 * Get column headers from a specific sheet
 * Called when sheet is selected AND when refresh is clicked
 */
function getColumnHeadersFromSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const columns = [];
  
  for (let i = 0; i < lastCol; i++) {
    columns.push({
      index: i + 1,
      letter: columnToLetter(i + 1),
      name: headers[i] ? String(headers[i]).substring(0, 20) : ''
    });
  }
  
  return columns;
}

/**
 * Refresh columns for multiple sheets at once
 * More efficient than calling getColumnHeadersFromSheet multiple times
 */
function refreshAllColumns(sheetNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const results = {};
  
  for (const sheetName of sheetNames) {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      results[sheetName] = [];
      continue;
    }
    
    const lastCol = sheet.getLastColumn();
    if (lastCol === 0) {
      results[sheetName] = [];
      continue;
    }
    
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const columns = [];
    
    for (let i = 0; i < lastCol; i++) {
      columns.push({
        index: i + 1,
        letter: columnToLetter(i + 1),
        name: headers[i] ? String(headers[i]).substring(0, 20) : ''
      });
    }
    
    results[sheetName] = columns;
  }
  
  return results;
}

/**
 * Get ALL data from ALL sheets in ONE call
 */
function getMultiSheetData(sheetsConfig) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const results = [];
  
  for (const config of sheetsConfig) {
    const sheet = ss.getSheetByName(config.sheetName);
    if (!sheet) continue;
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) continue;
    
    // Read ALL data at once - single read operation
    const sourceData = sheet.getRange(2, config.sourceCol, lastRow - 1, 1).getValues();
    const data = [];
    
    for (let i = 0; i < sourceData.length; i++) {
      const value = sourceData[i][0];
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        data.push({ row: i + 2, value: String(value) });
      }
    }
    
    results.push({
      sheetName: config.sheetName,
      targetCol: config.targetCol,
      data: data
    });
  }
  
  return results;
}

/**
 * Convert column number to letter (1 -> A, 27 -> AA)
 */
function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}
