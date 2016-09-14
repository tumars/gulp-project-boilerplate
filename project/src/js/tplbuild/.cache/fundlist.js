/*TMODJS:{"version":48,"md5":"3733fda118675aa00ad0fdff3b73f2d7"}*/
template('fundlist',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$string=$utils.$string,$out='';$out+='<ul class="fund-list"> ';
$each(list,function(value,i){
$out+=' <li class="fund-item"> <table class="fund-tbl" data-code="';
$out+=$escape(value.FCODE);
$out+='" data-name="';
$out+=$escape(value.SHORTNAME);
$out+='"> <tbody> <tr> <td colspan="3" class="left"> <h3 class="fund-title"> <a class="fund-detail" href="';
$out+=$escape(value.DETAILURL);
$out+='">';
$out+=$escape(value.SHORTNAME);
$out+='<small>（';
$out+=$escape(value.FCODE);
$out+='）</small></a> </h3> <!-- <p class="fund-qigou"><span class="arial">';
$out+=$escape(value.MINSG);
$out+='</span>元起购</p> --> </td> </tr> <tr> <td class="left col_1"> <span class="profit-title">近3月</span> <b class="profit arial ';
$out+=$escape(value.SYL_3Y.toString().charAt(0) == '-' ? 'green' : 'red');
$out+='">';
$out+=$escape(value.SYL_3Y.toFixed(2));
$out+='%</b> </td> <td class="left col_2"> <span class="profit-title">购买手续费</span> <p class="profit arial"> <del class="sourcerate">';
$out+=$escape(value.SOURCERATE);
$out+='</del>&nbsp; <span class="rate">';
$out+=$escape(value.RATE);
$out+='</span> </p> </td> <td class="col_3 fund-buy-wrap"> <a href="';
$out+=$escape(value.BUYURL);
$out+='" class="fund-buy">购买</a> </td> </tr> </tbody> </table> </li> ';
});
$out+=' </ul> <a href="';
$out+=$string();
$out+='" class="seemore">查看更多&gt;</a> <div class="funds-info"> <p>数据来源：东方财富Choice 银河证券<br />截止日期：';
$out+=$escape(list[0].FSRQ);
$out+='</p> </div> ';
return new String($out);
});