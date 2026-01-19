/**
 * Fast QR Generator for Google Sheets
 * Created by Asim - https://ko-fi.com/asimnet
 * 
 * File Structure:
 * - Code.gs         : Entry points (this file)
 * - SheetService.gs : Sheet operations
 * - QRService.gs    : QR writing functions
 * - Sidebar.html    : Main HTML (includes others)
 * - Styles.html     : CSS styles
 * - App.html        : JavaScript application
 * - QRLib.html      : QR code library
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔲 QR Generator')
    .addItem('Open Generator', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('QR Generator')
    .setWidth(320);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Include helper for HTML templates
 * Usage in HTML: <?!= include('Styles') ?>
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
