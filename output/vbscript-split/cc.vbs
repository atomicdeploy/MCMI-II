function cc()
	sum=0 
	if k.r5(1).checked then sum=sum+3 
	if k.r19(1).checked then sum=sum+1 
	if k.r26(1).checked then sum=sum+3 
	if k.r33(1).checked then sum=sum+2 
	if k.r36(1).checked then sum=sum+3 
	if k.r45(1).checked then sum=sum+2 
	if k.r47(1).checked then sum=sum+2 
	if k.r50(1).checked then sum=sum+2 
	if k.r51(1).checked then sum=sum+1 
	if k.r53(1).checked then sum=sum+3 
	if k.r54(1).checked then sum=sum+1 
	if k.r56(1).checked then sum=sum+2 
	if k.r57(1).checked then sum=sum+1 
	if k.r58(1).checked then sum=sum+1 
	if k.r59(1).checked then sum=sum+3 
	if k.r65(1).checked then sum=sum+1 
	if k.r67(1).checked then sum=sum+1 
	if k.r72(1).checked then sum=sum+2 
	if k.r76(1).checked then sum=sum+3 
	if k.r79(1).checked then sum=sum+2 
	if k.r81(1).checked then sum=sum+1 
	if k.r82(1).checked then sum=sum+1 
	if k.r95(1).checked then sum=sum+1 
	if k.r96(1).checked then sum=sum+2 
	if k.r99(1).checked then sum=sum+1 
	if k.r108(1).checked then sum=sum+2 
	if k.r109(1).checked then sum=sum+2 
	if k.r110(1).checked then sum=sum+1 
	if k.r117(1).checked then sum=sum+1 
	if k.r136(1).checked then sum=sum+3 
	if k.r154(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>46 then sum=46
	elseif sum>48 then sum=48
	end if
	cc=sum 
	r(23)="Major Depression" 
	w(23)=sum 
end function