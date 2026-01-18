/**
 * Fast QR Generator for Google Sheets
 * Optimized with TRUE batch operations
 * 
 * Created by Asim - https://ko-fi.com/asimnet
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔲 QR Generator')
    .addItem('Open Generator', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('QR Generator')
    .setWidth(320);
  SpreadsheetApp.getUi().showSidebar(html);
}

function getAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  return ss.getSheets().map(sheet => ({
    name: sheet.getName(),
    isActive: sheet.getName() === activeSheet.getName()
  }));
}

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

function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

// Get ALL data from ALL sheets in ONE call
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
 * OPTIMIZED BATCH WRITE
 * Write a batch of QR codes - called with larger batches, fewer times
 * Key optimizations:
 * 1. NO flush() during the batch - only at the end
 * 2. Minimal row height operations
 * 3. Single column width set
 */
function writeBatch(sheetName, items, targetCol, qrSize, setupDimensions) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) return { saved: 0, failed: items.length };
  
  let saved = 0;
  let failed = 0;
  
  // Set column width only once per sheet
  if (setupDimensions) {
    try {
      sheet.setColumnWidth(targetCol, qrSize + 10);
    } catch (e) {}
  }
  
  // Write all images WITHOUT flushing
  for (const item of items) {
    try {
      if (!item.base64 || !item.base64.startsWith('data:image/png;base64,')) {
        failed++;
        continue;
      }
      
      const cellImage = SpreadsheetApp.newCellImage()
        .setSourceUrl(item.base64)
        .setAltTextTitle('QR')
        .build();
      
      // Single setValue per cell - this is unavoidable for CellImage
      sheet.getRange(item.row, targetCol).setValue(cellImage);
      saved++;
    } catch (e) {
      failed++;
    }
  }
  
  // Batch set row heights AFTER all images
  if (setupDimensions) {
    for (const item of items) {
      try {
        sheet.setRowHeight(item.row, qrSize + 10);
      } catch (e) {}
    }
  }
  
  // Single flush at the end of batch
  SpreadsheetApp.flush();
  
  return { saved, failed };
}

/**
 * Set dimensions for ALL rows at once (called once per sheet)
 */
function setupDimensions(sheetName, targetCol, qrSize, rows) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  
  try {
    sheet.setColumnWidth(targetCol, qrSize + 10);
    for (const row of rows) {
      sheet.setRowHeight(row, qrSize + 10);
    }
    SpreadsheetApp.flush();
  } catch (e) {}
}
