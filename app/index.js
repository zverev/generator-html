var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.option('name');
    },
    prompting: {
        createFiles: function() {
            if (this.options.name) {
                doCreateFiles.call(this, this.options.name);
                return;
            }

            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: '' // Default to current folder name
            }, function(answers) {
                doCreateFiles.call(this, answers.name);
                done();
            }.bind(this));

            function doCreateFiles(name) {
                var widgetName = name;
                var scriptFileName = (name || 'script') + '.js';
                var stylesFileName = (name || 'styles') + '.css';

                this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), {
                    scriptFileName: scriptFileName,
                    stylesFileName: stylesFileName,
                    projectName: name || 'The app'
                });
                this.fs.copy(this.templatePath('script.js'), this.destinationPath(scriptFileName));
                this.fs.copy(this.templatePath('styles.css'), this.destinationPath(stylesFileName));
            }
        }
    }
});
