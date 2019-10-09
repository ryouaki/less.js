const html = require('html-template-tag')

/**
 * Generates HTML templates from list of test sheets
 */
module.exports = (stylesheets, helpers, spec) => {
    if (!Array.isArray(helpers)) {
        helpers = [helpers]
    }
    return html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    
    <title>Jasmine Spec Runner</title>

    <!-- for each test, generate CSS/LESS link tags -->
    $${stylesheets.map(function(fullLessName) {
        var pathParts = fullLessName.split('/');
        var fullCssName = fullLessName.replace(/less/g, 'css');
        var lessName = pathParts[pathParts.length - 1];
        var name = lessName.split('.')[0];
        return `
    <!-- the tags to be generated -->
    <link id="original-less:test-less-${name}" title="test-less-${name}" rel="stylesheet/less" type="text/css" href="../../${fullLessName}">
    <link id="expected-less:test-less-${name}" rel="stylesheet" type="text/css" href="../../${fullCssName}">
    ` }).join('')}

    $${helpers.map(helper => `
        <script src="../../${helper}"></script>
    `).join('')}

    <link rel="stylesheet" href="../../node_modules/mocha/mocha.css">
</head>

<body>
    <!-- content -->
    <div id="mocha"></div>
    <script src="../../node_modules/mocha/mocha.js"></script>
    <script src="../../node_modules/mocha-teamcity-reporter/lib/teamcityBrowser.js"></script>
    <script src="../../node_modules/chai/chai.js"></script>
    <script>
        expect = chai.expect
        mocha.setup({
            ui: 'bdd',
            timeout: 1000
        });
    </script>
    <script src="common.js"></script>
    <script src="../../${spec}"></script>
    <script src="less.min.js"></script>
    <script>mocha.run();</script>
</body>
</html>
`
}