const fs = require("fs");
const readline = require("readline");


for(let i=0; i<100; i++){
  for(let j=0; j < 100; j++){
    fs.appendFileSync("_sample.csv", `${i},${j},${i+j},${i*j}\n`, (err) => {
      if(err) console.log(err);
    });
  }
}



const rs = fs.createReadStream("_sample.csv", "utf8");
const ws = fs.createWriteStream('./__out.csv');
const rl = readline.createInterface({ input: rs });

const tmp = {};

rl.on("line", (data) => {
  const csv = data.split(",");
  const c ={};
  
  c.referenceNumber = csv[0]; //p.referenceNumber;
  c.courseNumber = csv[1]; // p.courseNumber;
  c.photoNumber = csv[2]; //p.photoNumber;
  
  const s = data + "\n";
  
  if(!tmp[c.referenceNumber]) tmp[c.referenceNumber] = {};
  if(!tmp[c.referenceNumber][c.courseNumber]) tmp[c.referenceNumber][c.courseNumber] = [];
  tmp[c.referenceNumber][c.courseNumber].push(c.photoNumber);
  
  const of = `__o_${c.referenceNumber}.txt`;
  fs.appendFile(of, s, (err) => {
    if(err) console.log(err);
  });
  
  ws.write(s);
  
});

rl.on('close', () => {

  console.log(tmp);

});



