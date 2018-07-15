var Generator = require('yeoman-generator');
var fs = require('fs');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('name', { type: String, required: false });
    }


    initializing() {
        this.config.save();
    }

    prompting() {
        let prompts = [];
        
        // prompt for the project name if it wasn't given
        if (!this.options.name) {
            prompts.unshift({
                type    : 'input',
                name    : 'name',
                message : 'Project name',
                default : this.appname
            });
        }

        return this
            .prompt(prompts)
            .then((answers) => {
                this.name = answers.name || this.options.name;
            });
    }

    writing() {
        // scaffold the .Net project
        if (fs.existsSync(this.name)) {
            throw `Directory ${this.name} already exists`;
        }

        fs.mkdirSync(this.name);

        // copy files
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath(`${this.name}/.gitignore`)
        );
        this.fs.copyTpl(
            this.templatePath('.dockerignore'),
            this.destinationPath(`${this.name}/.dockerignore`)
        );

        this.fs.copyTpl(
            this.templatePath('debug.Dockerfile'),
            this.destinationPath(`${this.name}/debug.Dockerfile`),
            { name: this.name }
        )


        // TODO -- create a docker-compose.yml file or append a service
    }
};