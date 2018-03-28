var fs = require('fs');

function main(){
   var file  = "test.json";
   var a = JSON.parse(fs.readFileSync(file).toString());
   a.age = 30;
   var b = JSON.stringify(a);
   fs.writeFileSync(file, b);
   var nj = JSON.parse(fs.readFileSync(file).toString());
   nj.name = "John";
   nj.prof = "Teacher";
   var c = JSON.stringify(nj, null, 2);
   fs.writeFileSync(file, c);
}
main();