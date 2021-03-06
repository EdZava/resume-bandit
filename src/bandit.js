var fs   = require("fs");
var _    = require("underscore");
var yaml = require("js-yaml");
var program = require("commander");

program
    .version("0.0.2")
    .option("-t, --template [path]", "Underscore template file name", "templates/clean.tpl")
    .option("-d, --data [path]", "YAML data file name", "data/sample.yaml")
    .option("-e, --encoding [charset]", "Set encoding", "utf8")
    .option("-o, --out [path]", "Output file name", "resume.html")
    .parse(process.argv);


var tpl_data = yaml.safeLoad(
    fs.readFileSync(program.data, program.encoding));

var stream = fs.createWriteStream(program.out);
stream.once("open", function(fd) {
    fs.readFile(program.template, program.encoding,
        function(error, data){ 
            stream.end(_.template(data)(tpl_data));
        }
    );
});
