/* Crutastic "Say hello" form.

   The form on crutastic.com posts here. Each note is saved as a row in a
   Google Sheet (made the first time a note arrives) and emailed to the
   owner of this script, with Reply-To set to the visitor, so pressing
   Reply answers them. The owner's email is never in the web page.
*/

var SHEET_NAME = 'Crutastic notes';
var PARTS_FOLDER = "App Parts (don't touch)";

function doPost(e) {
  var p = (e && e.parameter) || {};
  // Hidden "website" box: people never fill it in, spam bots often do.
  if (p.website) return reply_('ok');

  var name = clip_(p.name, 100);
  var email = clip_(p.email, 200);
  var message = clip_(p.message, 4000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply_('missing');
  }

  // Simple limit so a flood of posts can't fill the inbox: 30 notes an hour.
  var cache = CacheService.getScriptCache();
  var count = Number(cache.get('count') || 0);
  if (count >= 30) return reply_('busy');
  cache.put('count', String(count + 1), 3600);

  sheet_().appendRow([new Date(), name, email, message]);

  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    replyTo: email,
    name: 'Crutastic',
    subject: 'Crutastic note from ' + name,
    body: name + ' (' + email + ') wrote on crutastic.com:\n\n' + message +
      '\n\nPress Reply to answer them. All notes are in the "' + SHEET_NAME + '" sheet.'
  });
  return reply_('ok');
}

function doGet() {
  return reply_('Crutastic form is running.');
}

function sheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('sheetId');
  if (id) return SpreadsheetApp.openById(id).getSheets()[0];

  var ss = SpreadsheetApp.create(SHEET_NAME);
  var sh = ss.getSheets()[0];
  sh.appendRow(['When', 'Name', 'Email', 'Note']);
  sh.setFrozenRows(1);
  sh.setColumnWidth(4, 500);
  props.setProperty('sheetId', ss.getId());

  // Tuck the sheet into Claude's "App Parts" folder if it can be found.
  var parts = DriveApp.getFoldersByName(PARTS_FOLDER);
  if (parts.hasNext()) {
    var parent = parts.next();
    var sub = parent.getFoldersByName('Crutastic');
    var dest = sub.hasNext() ? sub.next() : parent.createFolder('Crutastic');
    DriveApp.getFileById(ss.getId()).moveTo(dest);
  }
  return sh;
}

// Run this once from the script editor to approve the script's access.
function setup() {
  sheet_();
  Logger.log('Ready. Sheet: ' + PropertiesService.getScriptProperties().getProperty('sheetId'));
}

function clip_(s, n) {
  return String(s || '').trim().slice(0, n);
}

function reply_(text) {
  return ContentService.createTextOutput(text);
}
