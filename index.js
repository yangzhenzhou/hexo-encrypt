var htmlTag = require('hexo-util').htmlTag,
	AES=require("crypto-js/aes"),
	CryptoJS = require("crypto-js"),
	MD5=require("crypto-js/md5");
var init_secret="";

/**
 * Emoji tag renders a single emoji.
 *
 * Syntax:
 *   {% emoji [emojiNameWithoutColons] [emojiSize] [class1,class2,class3] %}
 */
hexo.extend.tag.register('encrypt', function(args, content){
    var screte = args[0]; // emojiNameWithoutColons argument
    init_secret=screte;
    var encryt_div = {};
    encryt_div.class = "hidden";
    encryt_div.id = "secret_content";
    var mimajiami=MD5(screte).toString();
    encryt_div.content=mimajiami;
    //console.log(mimajiami);
    //console.log(htmlTag('div', encryt_div));
    return htmlTag('div', encryt_div);
});

hexo.extend.filter.register('after_post_render', function(data){
	jmcon=AES.encrypt(data.content,init_secret)
	//console.log(jmcon.toString());
	var prez='该文档已经加密<div style="display:none;" id="jiamineirong">'+jmcon.toString()+'</div>'
	data.content=prez;
	return data;
	//console.log("jiemi---------------------------------------");
	//console.log(AES.decrypt(jmcon.toString(),init_secret).toString(CryptoJS.enc.Utf8));
});

hexo.extend.filter.register('after_generate', function(){
  // ...
  console.log("okok");
});
