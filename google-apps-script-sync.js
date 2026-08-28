/**
 * The Mosaic Nails - Automatic Google Calendar Sync Script
 * 
 * Instructions:
 * 1. Log in to Google with: themosaicnails@gmail.com
 * 2. Go to: https://script.google.com and click "New project"
 * 3. Replace whatever is in Code.gs with this code.
 * 4. Click "Deploy" > "New deployment"
 * 5. Select Type: "Web app" (click gear icon next to 'Select type')
 * 6. Set "Execute as": "Me (themosaicnails@gmail.com)"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy", authorize access, and copy the Web App URL.
 * 9. Paste the URL into your project .env file:
 *    GOOGLE_CALENDAR_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Targets the default Google Calendar of themosaicnails@gmail.com
    var calendar = CalendarApp.getDefaultCalendar();
    
    var title = "The Mosaic Nails: " + (data.service || "Appointment") + " - " + (data.clientName || "Client");
    var startTime = new Date(data.startTime);
    var endTime = new Date(data.endTime);
    
    var description = "Appointment Details:\n" +
      "• Client: " + data.clientName + "\n" +
      "• Phone: " + data.clientPhone + "\n" +
      "• Service: " + data.service + "\n" +
      "• Date: " + data.date + "\n" +
      "• Time: " + (data.time || "Not specified") + "\n" +
      "• Notes: " + (data.notes || "None") + "\n" +
      "• Booking ID: " + data.id + "\n\n" +
      "Studio: " + (data.studioPhone || "+91 70399 11955");
      
    var options = {
      description: description,
      location: data.location || "Shop No. 71, 1st Floor, Sai Nirvana, Downtown, Shahad West-Kalyan"
    };
    
    var event = calendar.createEvent(title, startTime, endTime, options);
    
    // Add 1-hour and 1-day reminders
    event.addPopupReminder(60);
    event.addPopupReminder(1440);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      eventId: event.getId()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
