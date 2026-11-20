const SHEET_NAME = 'Patients';
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action !== 'sync') throw new Error('Unknown action');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(['Patient ID','Serial','Name','Age','Gender','Address','Phone','Visits JSON','Photo JSON','Reports JSON','Updated At']);
    const rows = sh.getDataRange().getValues(), index = {};
    for (let i=1;i<rows.length;i++) index[String(rows[i][0])] = i+1;
    (body.patients || []).forEach(p => {
      const row=[p.id,p.serial,p.name,p.age,p.gender,p.address,p.phone,JSON.stringify(p.visits||[]),JSON.stringify(p.photo||null),JSON.stringify(p.reports||[]),p.updatedAt||Date.now()];
      if(index[p.id]) sh.getRange(index[p.id],1,1,row.length).setValues([row]); else sh.appendRow(row);
    });
    return ContentService.createTextOutput(JSON.stringify({ok:true,message:'Cloud sync complete',count:(body.patients||[]).length})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,message:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
function createDailyBackupTrigger() {
  ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='dailyBackup').forEach(t=>ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('dailyBackup').timeBased().everyDays(1).atHour(2).create();
}
function dailyBackup() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const folderName='Awan Clinic Automatic Backups';
  const folders=DriveApp.getFoldersByName(folderName);
  const folder=folders.hasNext()?folders.next():DriveApp.createFolder(folderName);
  const copy=DriveApp.getFileById(ss.getId()).makeCopy('Awan_Clinic_Backup_'+Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyy-MM-dd_HH-mm'),folder);
}
