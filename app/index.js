var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    createFiles: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: '' // Default to current folder name
        }, function(answers) {
            var widgetName = answers.name;
            var scriptFileName = (answers.name || 'script') + '.js';
            var stylesFileName = (answers.name || 'styles') + '.css';
            
            this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), {
                scriptFileName: scriptFileName,
                stylesFileName: stylesFileName,
                projectName: answers.name || 'The app'
            });
            this.fs.copy(this.templatePath('script.js'), this.destinationPath(scriptFileName));
            this.fs.copy(this.templatePath('styles.css'), this.destinationPath(stylesFileName));

            done();
        }.bind(this));
    }
});