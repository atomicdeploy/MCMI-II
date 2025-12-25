function buttclick()

total=v+pp+cc+ss+t+b+n+d+h+a+p+c+s+eightb+eighta+seven+sixb+sixa+five+four+three+two+one+z+y 
 fname=k.t4.value
 if  not k.t1.value="" and not k.t2.value="" then
 name=k.t1.value
 code=k.t2.value
 end if
 age=k.t3.value
 if k.radgender(1).checked then  
	    male()  
	 else 
	    female()  
	 end if 
	 
	 rawx=(w(6)+w(11))*1.5+(w(3)+w(4)+w(5)+w(12))*1.6+w(7)+w(8)+w(9)+w(10) 
	rx=rawx-int(rawx) 
	if rx= .5 then rawx=rawx+ .1	 
	rrawx=round(rawx) 
	  
	select case rrawx 
	 case 145,146,147,148,149 
	   xcor=11 
	   hxcor=5 
	 case 150,151,152,153,154,155,156,157,158,159 
	   xcor=10 
	   hxcor=5 
	 case 160,161,162,163,164,165,166,167,168,169 
	   xcor=9 
	   hxcor=4 
	 case 170,171,172,173,174,175,176,177,178,179 
	   xcor=8 
	   hxcor=4 
	 case 180,181,182,183,184,185,186,187,188,189 
	   xcor=7 
	   hxcor=3 
	 case 190,191,192,193,194,195,196,197,198,199 
	   xcor=6 
	   hxcor=3 
	 case 200,201,202,203,204,205,206,207,208,209 
	   xcor=5 
	   hxcor=2 
	 case 210,211,212,213,214,215,216,217,218,219 
	   xcor=4 
	   hxcor=2 
	 case 220,221,222,223,224,225,226,227,228,229 
	   xcor=3 
	   hxcor=1 
	 case 230,231,232,233,234,235,236,237,238,239 
	   xcor=2 
	   hxcor=1 
	 case 240,241,242,243,244,245,246,247,248,249 
	   xcor=1 
	   hxcor=0 
	 case 250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400 
	   xcor=0 
	   hxcor=0 
	 case 401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416 
	   xcor=-1 
	   hxcor=0 
	 case 417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432 
	   xcor=-2 
	   hxcor=-1 
	 case 433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448 
	   xcor=-3 
	   hxcor=-1 
	 case 449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464 
	   xcor=-4 
	   hxcor=-2 
	 case 465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480 
	   xcor=-5 
	   hxcor=-2 
	 case 481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496 
	   xcor=-6 
	   hxcor=-3 
	 case 497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512 
	   xcor=-7 
	   hxcor=-3 
	 case 513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528 
	   xcor=-8 
	   hxcor=-4 
	 case 529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544 
	   xcor=-9 
	   hxcor=-4 
	 case 545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560 
	   xcor=-10 
	   hxcor=-5 
	 case 561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576 
	   xcor=-11 
	   hxcor=-5 
	 case 577,578,579,580,581,582,583,584,585,586,587,588,589,590 
	   xcor=-12 
	   hxcor=-6 
	  case else
	   msgbox "Raw X scale is:"&rrawx&chr(13)&"Report is invalid!" 
	   exit function
	end select 
	
	 if rrawx<180 then xscore=0
	 if rrawx>180 and rrawx<195 then xscore=5
	 if rrawx>194 and rrawx<207 then xscore=10
	 if rrawx>206 and rrawx<220 then xscore=15
	 if rrawx>219 and rrawx<232 then xscore=20
	 if rrawx>231 and rrawx<245 then xscore=25
	 if rrawx>244 and rrawx<257 then xscore=30
	 if rrawx>256 and rrawx<270 then
	 if k.radgender(1).checked then xscore=35 else xscore=34
	  
	 end if
	 if rrawx>269 and rrawx<282 then xscore=40
	 if rrawx>281 and rrawx<295 then xscore=45
	 if rrawx>294 and rrawx<307 then xscore=50
	 if rrawx>306 and rrawx<320 then
	 if k.radgender(1).checked then xscore=55 else xscore=54
	  
	 end if
	 if rrawx>319 and rrawx<345 then
	 if k.radgender(1).checked then xscore=60 else xscore=55
	  
	 end if
	 if rrawx>344 and rrawx<357 then
	 if k.radgender(1).checked then xscore=63 else xscore=56
	  
	 end if
	 if rrawx>356 and rrawx<370 then
	 if k.radgender(1).checked then xscore=66 else xscore=58
	  
	 end if
	 if rrawx>369 and rrawx<382 then
	 if k.radgender(1).checked then xscore=69 else xscore=60
	  
	 end if
	 if rrawx>381 and rrawx<395 then
	 if k.radgender(1).checked then xscore=72 else xscore=63
	  
	 end if
	 if rrawx>394 and rrawx<420 then
	 if k.radgender(1).checked then xscore=74 else xscore=65
	  
	 end if
	 if rrawx>419 and rrawx<432 then
	 if k.radgender(1).checked then xscore=77 else xscore=67
	  
	 end if
	 if rrawx>431 and rrawx<445 then
	 if k.radgender(1).checked then xscore=79 else xscore=70
	  
	 end if
	 if rrawx>444 and rrawx<457 then
	 if k.radgender(1).checked then xscore=81 else xscore=72
	  
	 end if
	 if rrawx>456 and rrawx<470 then
	 if k.radgender(1).checked then xscore=83 else xscore=75
	  
	 end if
	 if rrawx>469 and rrawx<483 then
	 if k.radgender(1).checked then xscore=85 else xscore=79
	  
	 end if
	 if rrawx>482 and rrawx<495 then
	 if k.radgender(1).checked then xscore=87 else xscore=84
	  
	 end if
	 if rrawx>494 and rrawx<508 then xscore=89
	 if rrawx>507 and rrawx<520 then xscore=91
	 if rrawx>519 and rrawx<533 then xscore=93
	 if rrawx>532 and rrawx<545 then xscore=95
	 if rrawx>544 and rrawx<558 then xscore=97
	 if rrawx>557 then xscore=100
	 
      dacontain=daadjust()  
	  ddcontain=ddadjust() 
	  inpadjust=k.d1.value 
	   
	   select case inpadjust 
		 case 1,4 
		   da=int(.25*dacontain) 
		   if da>15 then da=15 
		   dac=int(.5*dacontain) 
		   if dac>10 then dac=10 
		     
		 case 2 
		   da=dacontain 
		   if da>25 then da=25 
		   dac=dacontain 
		   if dac>20 then dac=20 
		   afterinp(22)=afterinp(22)+8 
		   afterinp(23)=afterinp(23)+10 
		   afterinp(24)=afterinp(24)+4 
		 case 3 
		   da=int(.5*dacontain) 
		   if da>15 then da=15 
		   dac=int(.75*dacontain) 
		   if dac>15 then dac=15 
		   afterinp(22)=afterinp(22)+5 
		   afterinp(23)=afterinp(23)+7 
		   afterinp(24)=afterinp(24)+2 
		 case 5 
 		   da=int(.5*dacontain) 
		   if da>15 then da=15 
		   dac=int(.75*dacontain) 
		   if dac>15 then dac=15 
	  	     
	   end select 
gg(1)="Y" 
gg(2)="Z" 
gg(3)="1" 
gg(4)="2" 
gg(5)="3" 
gg(6)="4" 
gg(7)="5" 
gg(8)="6A" 
gg(9)="6B" 
gg(10)="7" 
gg(11)="8A" 
gg(12)="8B" 
gg(13)="S" 
gg(14)="C" 
gg(15)="P" 
gg(16)="A" 
gg(17)="H" 
gg(18)="N" 
gg(19)="D" 
gg(20)="B" 
gg(21)="T" 
gg(22)="SS" 
gg(23)="CC" 
gg(24)="PP" 

 
 document.write  "<center><b>"&k.t1.value & k.t3.value & " ساله"  &"</b></center>"
 
  
 		
 
	  document.write "<table border=0 cellspacing=0 cellpadding=0 ><tbody>" 
	   document.write "<tr height=34><td width=167 colspan=2> </td><td width=34 style='border-left-style: solid;  border-top-style:solid;border-color: #000000'>Raw Score</td><td width=34 style='border-left-style: solid; border-right-style: solid; border-top-style:solid; border-color: #000000'>BR from table</td><td width=34 style='border-right-style: solid;  border-top-style:solid;border-color: #000000'>BR  X   Cor.</td><td width=34 style='  border-right-style: solid; border-top-style:solid; border-color: #000000'>BR  1/2X   Cor.</td><td width=34 style=' border-right-style: solid; border-top-style:solid; border-color: #000000'>BR  DA Adj.</td><td width=34 style=' border-right-style: solid; border-top-style:solid; border-color: #000000'>BR  DD Adj.</td><td width=34 style='  border-right-style: solid; border-top-style:solid; border-color: #000000'>BR  DC Adj.</td><td width=34 style='  border-top-style:solid ; border-color: #000000'>BR  Inp Adj.</td><th   style=' border-right-style: solid; border-top-style:solid; border-color: #000000'>Final BR</th></tr>"
  
for i= 1 to 24 
	  if i mod 2=0 then 
		xx="FFFFFF" 
		   
 	  else  
		xx="c0c0c0" 
	  	  
	  end if 
 
	if i=1 or i=2 or i=13 or i=14 or i=15 or i=22 or i=23 or i=24 then aftercor(i)="" else aftercor(i)=rawbr(i)+xcor  
	if i=13 or i=14 or i=15 or i=22 or i=23 or i=24 then afterhcor(i)=rawbr(i)+hxcor else afterhcor(i)="" 
	 
	if i=4 or i=12 then  
		dabr(i)=aftercor(i)-da 
	elseif i=14 then  
	  	dabr(i)=afterhcor(i)-dac 
	else dabr(i)="" 
	end if 
 
	 if i=13 then 
	     afterddcor(i)=afterhcor(i)+ddcontain 
	  elseif i=14 then 
	     afterddcor(i)=dabr(i)+ddcontain 
	  elseif i=16 or i=17 or i=19 then 
	     afterddcor(i)=aftercor(i)+ddcontain 
	  else 
	     afterddcor(i)="" 
	  end if 
	if i=4 or i=12 then fordc(i)=dabr(i) else fordc(i)=aftercor(i) 
	if i=13 then dcadjust() 
		if i>12 then 
		select case i 
		  case 13,14,16,17,19 
   			afterdccor(i)=afterddcor(i)  
		  case 15 
  			afterdccor(i)=afterhcor(i)  
  		  case else  
			afterdccor(i)="" 
		end select 
	 	if g=6 or g=7 or g=10 or gp=10 then 
		   select case i 
			case 13,14 
   				afterdccor(i)=afterdccor(i)+4 
			case 15 
  				afterdccor(i)=afterdccor(i)+2 
  			case 16,19	 
				afterdccor(i)=afterdccor(i)+15 
			case 17 
  				afterdccor(i)=afterdccor(i)+13 
		  
		   end select 
  
		end if 
		if g=12 or g=4 or gp=4 then 
		   select case i 
			case 13 
				afterdccor(i)=afterdccor(i)-2 
			case 14,15 
				afterdccor(i)=afterdccor(i)-6 
  			case 16 
  				afterdccor(i)=afterdccor(i)-7 
			case 17,19 
  				afterdccor(i)=afterdccor(i)-5 
			  
 		   end select 
		end if 
	end if 
	if i=22 or i=23 or i=24 then afterinp(i)=afterhcor(i)+afterinp(i) else afterinp(i)="" 
	select case i 
		case 1,2 
		  afterall(i)=rawbr(i) 
		case 3,5,6,7,8,9,10,11,18,20,21 
		  afterall(i)=aftercor(i) 
		case 4,12 
		  afterall(i)=dabr(i) 
		case 13,14,15,16,17,19 
		  afterall(i)=afterdccor(i) 
		case 22,23,24 
		  afterall(i)=afterinp(i) 
		 
	  end select 
  
   
	document.write "<tr bgcolor=#"&xx&"><td align=center width=10 bgcolor=000000><font color=ffffff>"&gg(i)& "</td><th align=left width=164>"&r(i)   
    document.write "</th><th align=center width=34  style='border-left-style:solid' bordercolor='000000'><u>" &w(i)  
	document.write "</u></th><th width=34  style='border-left-style:solid' bordercolor='000000'><u>"&rawbr(i)&"</u></th> " 
	document.write "<th width=34><u>"&aftercor(i)&"</u></th>" 
	document.write "<th width=34><u>"&afterhcor(i)&"</u></th>" 
	document.write "<th width=34><u>"&dabr(i)&"</u></th>" 
	document.write "<th width=34><u>"&afterddcor(i)&"</u></th>" 
	document.write "<th width=34><u>"&afterdccor(i)&"</u></th>" 
	document.write "<th width=34><u>"&afterinp(i)&"</u></th>" 
	document.write "<th width=34  style='border-left-style:solid' bordercolor='000000'><u>"&afterall(i)&"</u></th><td align=center width=10 bgcolor='000000' ><font color='FFFFFF'>"&gg(i)&"</td></tr>" 
	
next 
 
 document.write  "</tbody></table>" 
 
 f="Report is done!"

 if wf=1 then
			
            set fso=createobject("scripting.filesystemobject")
 			set f1=fso.OpenTextFile (fname&".htm",2,true)
 			f1.write "Report from "&name&"<br>Age:"&age&"<br>Code:"&code&"<br><table cellspacing=5>"
 			for i= 1 to 24
 				f1.write "<tr><td>"&gg(i)&"</td><td>"&afterall(i)&"</td></tr>"
 			 
 			next
 			f1.write "</table>"
 			f1.close

			if fso.FileExists (fname&".htm") then
				 f="A report has been successfully saved in file    "&fname&".htm"
			end if
  end if 
  document.write "<b>X (Disclosure):"&xscore &"</b><br>"
  document.write "<b>"&f
end function