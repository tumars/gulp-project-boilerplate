/*TMODJS:{"version":11,"md5":"aac20e94311dd91b86189dd94f457377"}*/
template('fundlist2',function($data,$filename
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
$out+='）</small></a> </h3> <p class="fund-qigou"><span class="arial">';
$out+=$escape(value.MINSG);
$out+='</span>元起购</p> </td> </tr> <tr> <td class="left col_1"> <span class="profit-title">';
$out+=$escape(value.fittitle);
$out+='</span> <b class="profit arial red">';
$out+=$escape(value.SYL);
$out+='%</b> </td> <td class="left col_2"> <span class="profit-title">运作期</span> <p class="profit arial"> <span class="rate">';
$out+=$escape(value.CYCLE1);
$out+='</span> </p> </td> <td class="col_3 fund-buy-wrap"> <a href="';
$out+=$escape(value.BUYURL);
$out+='" class="fund-buy">购买</a> </td> </tr> </tbody> </table> </li> ';
});
$out+=' </ul> <a href="';
$out+=$string();
$out+='" class="seemore">查看更多&gt;</a> ';
return new String($out);
});