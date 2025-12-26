function h()
	sum=0 
	if k.r5(1).checked then sum=sum+1 
	if k.r18(1).checked then sum=sum+2 
	if k.r26(1).checked then sum=sum+1 
	if k.r29(1).checked then sum=sum+3 
	if k.r31(1).checked then sum=sum+1 
	if k.r33(1).checked then sum=sum+3 
	if k.r36(1).checked then sum=sum+1 
	if k.r41(0).checked then sum=sum+1 
	if k.r42(1).checked then sum=sum+1 
	if k.r50(1).checked then sum=sum+1 
	if k.r51(1).checked then sum=sum+2 
	if k.r53(1).checked then sum=sum+2 
	if k.r56(1).checked then sum=sum+1 
	if k.r60(1).checked then sum=sum+1 
	if k.r66(1).checked then sum=sum+1 
	if k.r67(1).checked then sum=sum+2 
	if k.r68(1).checked then sum=sum+3 
	if k.r71(1).checked then sum=sum+3 
	if k.r72(1).checked then sum=sum+3 
	if k.r78(1).checked then sum=sum+1 
	if k.r96(1).checked then sum=sum+3 
	if k.r98(1).checked then sum=sum+2 
	if k.r102(1).checked then sum=sum+1 
	if k.r109(1).checked then sum=sum+1 
	if k.r114(1).checked then sum=sum+2 
	if k.r117(1).checked then sum=sum+1 
	if k.r118(1).checked then sum=sum+1 
	if k.r137(1).checked then sum=sum+1 
	if k.r145(1).checked then sum=sum+1 
	if k.r170(1).checked then sum=sum+1 
	if k.r173(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>43 then sum=43
	elseif sum>44 then sum=44
	end if
	h=sum 
	w(17)=sum 
	r(17)="Somatoform" 
end function