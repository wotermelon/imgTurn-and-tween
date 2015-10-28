window.onload=initPage;
function initPage(){
	var wrap=document.getElementById('wrap');
	var inner=document.getElementById('inner');
	var imglist=inner.getElementsByTagName('img');
	var spanlist=document.getElementById('ctrl').getElementsByTagName('span');
	var pre=document.getElementById('pre');
	var next=document.getElementById('next');
	
	var perwidth=imglist[0].offsetWidth;
	
	var index=0;
	var timer=null;
	var autotimer=null;
	var flag = true;
	
//	inner.innerHTML +=inner.innerHTML;
	
	//过渡效果
	function tab(){
		var start = inner.offsetLeft;
		var end = -index*perwidth;
		var change = end - start;
		var t = 0;
		var maxT = 30;
		flag=false;
		clearInterval(timer);
		timer = setInterval(function(){
			t++;
			if(t>=maxT){
				clearInterval(timer);
				flag=true;
			}
//			inner.style.left = change*t/maxT + start + 'px';
			inner.style.left = Tween.Cubic.easeOut(t,start,change,maxT) + 'px';
			if(index >= spanlist.length && t>=maxT){
				index=0;
				inner.style.left = "0";
			}
		},30);
		
		for(var j=0;j<spanlist.length;j++){
				spanlist[j].className="";
				if(index>spanlist.length-1){
					spanlist[0].className="active";
				}else{
					spanlist[index].className="active";
				}
		}
	}//tab结束
	
	function nextTab(){
		index++;
		tab();
	}
	function preTab(){
		index--;
		if(index<0){
			inner.style.left = -spanlist.length*perwidth + 'px';
			index = spanlist.length-1;
		}
		tab();
	}
	//按钮点击事件
	for(var i=0;i<spanlist.length;i++){
		spanlist[i].index=i;
		spanlist[i].onclick=function(){
			index=this.index;
			tab();	
		};
	}
	
	next.onclick=function(){
		if(flag){
			nextTab();
		}
	};
	
	pre.onclick=function(){
		if(flag){
			preTab();
		}
	};
	
	autotimer = setInterval(nextTab,2000);
	
	wrap.onmouseover=function(){
		clearInterval(autotimer);
	};
	wrap.onmouseout=function(){
		autotimer=setInterval(nextTab,2000);
	};
}












