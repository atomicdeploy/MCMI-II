function a()
	sum=0 
	if k.r8(1).checked then sum=sum+1 
	if k.r16(1).checked then sum=sum+1 
	if k.r18(1).checked then sum=sum+3 
	if k.r26(1).checked then sum=sum+1 
	if k.r29(1).checked then sum=sum+2 
	if k.r33(1).checked then sum=sum+2 
	if k.r36(1).checked then sum=sum+1 
	if k.r51(1).checked then sum=sum+3 
	if k.r53(1).checked then sum=sum+2 
	if k.r54(1).checked then sum=sum+1 
	if k.r67(1).checked then sum=sum+3 
	if k.r71(1).checked then sum=sum+2 
	if k.r78(1).checked then sum=sum+1 
	if k.r96(1).checked then sum=sum+2 
	if k.r97(1).checked then sum=sum+2 
	if k.r99(1).checked then sum=sum+1 
	if k.r108(1).checked then sum=sum+1 
	if k.r109(1).checked then sum=sum+2 
	if k.r114(1).checked then sum=sum+3 
	if k.r117(1).checked then sum=sum+3 
	if k.r132(1).checked then sum=sum+1 
	if k.r145(1).checked then sum=sum+1 
	if k.r153(1).checked then sum=sum+1 
	if k.r166(0).checked then sum=sum+1 
	if k.r167(1).checked then sum=sum+2 
	
	if k.radgender(1).checked then
		if sum>36 then sum=36
	elseif sum>39 then sum=39
	end if
	a=sum 
	w(16)=sum 
	r(16)="Anxiety" 
end function