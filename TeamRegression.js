
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamRegressionSheet = function (name) {
    SheetBase.call(this, name);

    // Check Release sheet
    this.currentRelease = new ReleaseSheet("Release");
}

// create prototype from parent class
TeamRegressionSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamRegressionSheet.prototype.constructor = TeamRegressionSheet;

TeamRegressionSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

    // Prepare TeamQuery
     var TeamDOM = new TeamBugQueryBase("DOM");
    var TeamNetwork = new TeamBugQueryBase("Network");
    var TeamSecurity = new TeamBugQueryBase("Security");
    var TeamLayout = new TeamBugQueryBase("Layout");
    var TeamGraphic = new TeamBugQueryBase("Graphic");
    var TeamMedia = new TeamBugQueryBase("Media");
    var TeamPerf = new TeamBugQueryBase("Perf");

    var TeamMozDOM = new TeamBugQueryBase("MozillaDOM");
    var TeamMozNetwork = new TeamBugQueryBase("MozillaNetwork");
    var TeamMozSecurity = new TeamBugQueryBase("MozillaSecurity");
    var TeamMozLayout = new TeamBugQueryBase("MozillaLayout");
    var TeamMozGraphic = new TeamBugQueryBase("MozillaGraphic");
    var TeamMozMedia = new TeamBugQueryBase("MozillaMedia");

    var TeamFirefox = new TeamBugQueryBase("Firefox");
    var TeamCore = new TeamBugQueryBase("Core");
    var TeamAndroid = new TeamBugQueryBase("Firefox for Android");

    // Loop Firefox Version from columns
    var numVersions = 2;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [ ['Core', TeamDOM], ['Core', TeamSecurity], ['Core', TeamNetwork], ['Core', TeamLayout],
                     ['Core', TeamGraphic], ['Core', TeamMedia], ['Core', TeamPerf],
                     ['Core', TeamMozDOM], ['Core', TeamMozSecurity], ['Core', TeamMozNetwork], ['Core', TeamMozLayout],
                     ['Core', TeamMozGraphic], ['Core', TeamMozMedia],
                     ["Firefox", TeamFirefox], [ 'Core',TeamCore], ["Firefox for Android", TeamAndroid]];
    for (var ver = 0; ver < numVersions; ver++) {

        // Fetch the range of cells B1 -> [numVersions]1
        var FFversion = this.sheet.getRange(this.rowVersion, this.colStartDate + ver, 1, 1).getValue();
        var FFDate = this.sheet.getRange(this.rowDate, this.colStartDate, 1, 1).getValue();

        // Loop each team to get regression+crash count
        for (i = 0; i < loopTeam.length; i++) {

            var rowsTeamResult = 10;
            loopTeam[i][1].SearchFixedRegression(loopTeam[i][0], FFversion);
            loopTeam[i][1].RenderToSheet(this.sheet, rowFirstResult + rowsTeamResult * i, this.colStartDate + ver);

        }
    }
}

function UpdateRegressionSheet() {

    // Generate Sheet
    var Sheet = new TeamRegressionSheet("Regression");
    Sheet.Generate();
}
