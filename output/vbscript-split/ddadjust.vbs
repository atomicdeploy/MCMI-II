function ddadjust()
	dd=(rawbr(1)-rawbr(2))/10 
	if abs(dd-round(dd))=.5 then  
		if dd=abs(dd) then 
		   dd=dd+.1 
		else  
		   dd=dd-.1 
		end if 
	end if 
	rdd=round(dd)  
	if rdd>10 then rdd=10 
	if rdd<-10 then rdd=-10 
	ddadjust=rdd 
end function