/* Crutastic "Say hello" form.

   The form on crutastic.com posts here. Each note is emailed to the owner
   of this script, with Reply-To set to the visitor, so pressing Reply
   answers them. The owner's email is never in the web page.
*/

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

  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    replyTo: email,
    name: 'Crutastic',
    subject: 'Crutastic note from ' + name,
    body: name + ' (' + email + ') wrote on crutastic.com:\n\n' + message +
      '\n\nPress Reply to answer them.'
  });
  return reply_('ok');
}

function doGet() {
  return reply_('Crutastic form is running.');
}

// Run this once from the script editor to approve sending email.
function setup() {
  Logger.log('Ready. Notes will go to ' + Session.getEffectiveUser().getEmail());
}

function clip_(s, n) {
  return String(s || '').trim().slice(0, n);
}

function reply_(text) {
  return ContentService.createTextOutput(text);
}
