const cheerio=require("cheerio");
const request=require("request");
const http=require("http");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function getIssuePageHtml(url,topic,repoName) {
    request(url,cb);
    function cb(err,request,html) {
        if(err){
            console.log(err);
        }
    //     else if (response.statusCode==404){
    //     console.log("Page not found");
    // }
        else{
            getIssues(html);
        }
    }
    function getIssues(html) {
        let $=cheerio.load(html);
        let issuesElemArr=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log(issuesElemArr.length);
        let arr= [];
        for(let i=0;i<issuesElemArr.length;i++){
            let link=$(issuesElemArr[i]).attr("href");
            arr.push(link);
        }
        let folderPath=path.join(__dirname,topic);
        dirCreator(folderPath);
        let filePath=path.join(folderPath,repoName+".pdf");
        console.log(filePath);
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        
    }
    
}
module.exports=getIssuePageHtml;
function dirCreator(folderPath) {
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath);
    }
    
}