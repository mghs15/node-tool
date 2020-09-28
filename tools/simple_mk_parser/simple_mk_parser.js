const fs = require("fs");

//入出力・処理
var infile = process.argv[2];
var outfile = process.argv[3];

var content = fs.readFileSync(infile).toString();

var res = {
   "main": "",
   "head": "",
   "flag": {}
};

var count = 0;

var lines = content.split("\n");


lines.forEach( line => {
  
  line = line.replace(/\r/, "");
  
  count++;
  
  //url
  var mUrl = line.match(/(?:^|\s)(http(?:\S)*)(?:\s|$)/g);
  if(mUrl && !res.flag.code){
    mUrl.forEach(url => {
      url = url.replace(/\s/g, "");
      var atag = "<a target='_blank' href='" + url + "'>" + url + "</a>";
      line = line.replace(url, atag);
      
    });
    line = line.replace(/\s*,/g, ",");
    line = line.replace(/\s*\./g, ".");
  }
  
  
  //link [hoge](https://example.com/)
  var mLink = line.match(/\[([^\[\]])*\]\(([^()]*)\)/g);
  if(mLink && !res.flag.code){
    console.log(mLink);
    mLink.forEach(link => {
      var linkparse = link.match(/\[([^\[\]]*)\]\(([^()]*)\)/);
      console.log(linkparse);
      var atag = "<a target='_blank' href='" + linkparse[2] + "'>" + linkparse[1] + "</a>";
      line = line.replace(link, atag);
    });
  }
  
  //強調 Strong
  var mStrong = line.match(/\*\*[^*]*\*\*/g);
  if(mStrong && !res.flag.code){
    mStrong.forEach(str => {
      str = str.replace(/\*\*/g, "");
      var strtag = "<strong>" + str + "</strong>";
      var repstr = "**" + str + "**";
      line = line.replace(repstr, strtag);
    });
  }
  
  //インライン <code>
  var mH = line.match(/`[^`]+`/g);
  if(mH && !res.flag.code){
    mH.forEach(str => {
      str = str.replace(/`/g, "");
      //str = str.replace("<", "&lt;");
      //str = str.replace(">", "&gt;");
      var strtag = "<code>" + str + "</code>";
      var repstr = "`" + str + "`";
      line = line.replace(repstr, strtag);
    });
  }
  
  
  
  //title
  var mTitle = line.match(/^(#+)\s+(.*)$/);
  if(mTitle && !res.flag.code){
    var htag = "h" + mTitle[1].length;
    //var title = "<" + htag + " " + "id='" + mTitle[2] + count + "'>" + mTitle[2] + "</" + htag + ">";
    var title = "<" + htag + " " + "id='" + mTitle[2] + "'>" + mTitle[2] + "</" + htag + ">";
    line = title;
    
    //目次生成
    var indent = "- ".repeat(mTitle[1].length - 1);
    //var head = indent + "<a href='#" + mTitle[2] + count + "'>" + mTitle[2] + "</a>" + "<br>\n";
    var head = indent + "<a href='#" + mTitle[2] + "'>" + mTitle[2] + "</a>" + "<br>\n";
    res.head += head;
  }
  
  //画像
  var mImage = line.match(/^!\[([^\]]*)\]\((.*)\)$/);
  if(mImage && !res.flag.code){
    var img = "<div><img src='" +  mImage[2] + "' alt='" + mImage[1] + "'><div>";
    line = img;
  }
  
  
  //ブロック <code>
  if(res.flag.code){
    line = line.replace("<", "&lt;");
    line = line.replace(">", "&gt;");
  }
  var mCode = line.match(/^\`\`\`(.*)$/);
  if(mCode){
    if(!res.flag.code){
      line = "<pre><code>";
      res.flag.code = true;
    }else{
      line = "</code></pre>";
      res.flag.code = false;
    }
  }
  
  
  //list ---- 
  //<ul>
  var mUl = line.match(/^\*\s(.*)/);
  if(mUl && !res.flag.code){
    var li = "<li>" + mUl[1] + "</li>";
    if(!res.flag.ul){
      li = "<ul>" + "\n" + li;
      res.flag.ul = true;
    }
    line = li;
  }
  if( ( !line )
        && res.flag.ul && res.flag.blank){ //空行フラグ参照
    line += "\n</ul>";
    res.flag.ul = false;
  }
  
  //<ol>
  var mOl = line.match(/^\d+\.\s(.*)/);
  if(mOl && !res.flag.code){
    var li = "<li>" + mOl[1] + "</li>";
    if(!res.flag.ol){
      li = "<ol>" + "\n" + li;
      res.flag.ol = true;
    }
    line = li;
  }
  if( ( !line )
        && res.flag.ol && res.flag.blank){ //空行フラグ参照
    line += "\n</ol>";
    res.flag.ol = false;
  }

  
  

  
  if(!res.flag.code){
    if(!line && !res.flag.blank){
      res.flag.blank = true;
      var line = "<br>";
    }else if(line){
      res.flag.blank = false;
    }
  }
  
  res.main += (line + "\n");

});

res.main = res.main.replace(/<\/(h\d*|ul|ol|li|pre)>\s*<br>/g, "</$1>\n");
res.main = res.main.replace(/<code>\n/g, "<code>");

//console.log(res.main);
//console.log("--------");
//console.log(res.head);

var resstring = "<html><head>"
                + "<link rel='stylesheet' type='text/css' href='./common.css'>"
                + "<body>" 
                + "<div class='index'><h1>Index</h1>" + res.head + "</div>"
                + "<div class='main'>" + res.main + "</div></body></html>";
fs.writeFileSync(outfile, resstring);
