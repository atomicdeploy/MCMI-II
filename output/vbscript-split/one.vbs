function one()
	sum=0 
	if k.r2(1).checked then sum=sum+3 
	if k.r10(1).checked then sum=sum+2 
	if k.r13(1).checked then sum=sum+3 
	if k.r14(0).checked then sum=sum+1 
	if k.r16(1).checked then sum=sum+1 
	if k.r19(1).checked then sum=sum+3 
	if k.r20(0).checked then sum=sum+2 
	if k.r22(1).checked then sum=sum+1 
	if k.r25(1).checked then sum=sum+1 
	if k.r28(0).checked then sum=sum+1 
	if k.r33(1).checked then sum=sum+2 
	if k.r34(1).checked then sum=sum+3 
	if k.r46(1).checked then sum=sum+1 
	if k.r47(1).checked then sum=sum+2 
	if k.r48(0).checked then sum=sum+2 
	if k.r53(1).checked then sum=sum+1 
	if k.r60(0).checked then sum=sum+1 
	if k.r78(0).checked then sum=sum+1 
	if k.r81(1).checked then sum=sum+3 
	if k.r83(1).checked then sum=sum+2 
	if k.r85(1).checked then sum=sum+1 
	if k.r95(0).checked then sum=sum+1 
	if k.r103(0).checked then sum=sum+1 
	if k.r106(1).checked then sum=sum+2 
	if k.r108(1).checked then sum=sum+1 
	if k.r111(0).checked then sum=sum+1 
	if k.r124(1).checked then sum=sum+2 
	if k.r125(0).checked then sum=sum+1 
	if k.r159(1).checked then sum=sum+1 
	if k.r160(1).checked then sum=sum+1 
	if k.r161(1).checked then sum=sum+3 
	if k.r141(1).checked then sum=sum+1 
	if k.r142(1).checked then sum=sum+1 
	if k.r143(1).checked then sum=sum+3 
	if k.r150(1).checked then sum=sum+2 
	
	if k.radgender(1).checked then
		if sum>40 then sum=40
	elseif sum>44 then sum=44
	end if
	one=sum 
	w(3)=sum 
	r(3)="Schizoid" 
end function