/**
 * QR Service - QR code writing operations
 */

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
  } catch (e) {
    console.error('setupDimensions error:', e);
  }
}

/**
 * OPTIMIZED BATCH WRITE
 * Write a batch of QR codes - called with larger batches, fewer times
 * 
 * Key optimizations:
 * 1. NO flush() during the batch - only at the end
 * 2. Minimal row height operations
 * 3. Single column width set
 * 
 * @param {string} sheetName - Name of the sheet
 * @param {Array} items - Array of {row, base64} objects
 * @param {number} targetCol - Target column number
 * @param {number} qrSize - QR code size in pixels
 * @param {boolean} isFirst - Is this the first batch for this sheet
 * @param {boolean} isLast - Is this the last batch for this sheet
 */
function writeBatch(sheetName, items, targetCol, qrSize, isFirst, isLast) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) return { saved: 0, failed: items.length };
  
  let saved = 0;
  let failed = 0;
  
  // Set column width only once per sheet (on first batch)
  if (isFirst) {
    try {
      sheet.setColumnWidth(targetCol, qrSize + 10);
    } catch (e) {
      console.error('setColumnWidth error:', e);
    }
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
      
      // Set row height for this item
      try {
        sheet.setRowHeight(item.row, qrSize + 10);
      } catch (e) {
        // Ignore row height errors
      }
      
      saved++;
    } catch (e) {
      console.error('writeBatch item error:', e);
      failed++;
    }
  }
  
  // Single flush at the end of batch
  SpreadsheetApp.flush();
  
  return { saved, failed };
}

/**
 * Alternative: Write single QR code (for smaller operations)
 */
function writeQRCode(sheetName, row, targetCol, base64, qrSize) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) return false;
  
  try {
    if (!base64 || !base64.startsWith('data:image/png;base64,')) {
      return false;
    }
    
    const cellImage = SpreadsheetApp.newCellImage()
      .setSourceUrl(base64)
      .setAltTextTitle('QR')
      .build();
    
    sheet.getRange(row, targetCol).setValue(cellImage);
    sheet.setRowHeight(row, qrSize + 10);
    sheet.setColumnWidth(targetCol, qrSize + 10);
    
    return true;
  } catch (e) {
    console.error('writeQRCode error:', e);
    return false;
  }
}
