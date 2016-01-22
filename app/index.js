var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.option('name');
        this.option('index');
    },
    prompting: {
        createFiles: function() {
            if (typeof this.options.name === 'string' && this.options.name) {
                return;
            }

            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: '' // Default to current folder name
            }, function(answers) {
                this.options.name = answers.name;
                done();
            }.bind(this));
        }
    },
    writing: function() {
        var name = this.options.name;
        var widgetName = name;
        var htmlFileName = (this.options.index ? 'index.html' : name + '.html');
        var scriptFileName = (name || 'script') + '.js';
        var stylesFileName = (name || 'styles') + '.css';

        this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath(htmlFileName), {
            scriptFileName: scriptFileName,
            stylesFileName: stylesFileName,
            projectName: name || 'The app'
        });
        this.fs.copy(this.templatePath('script.js'), this.destinationPath(scriptFileName));
        this.fs.copy(this.templatePath('styles.css'), this.destinationPath(stylesFileName));
    }
});
