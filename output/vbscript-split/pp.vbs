function pp()
	sum=0 
	if k.r15(1).checked then sum=sum+1 
	if k.r16(1).checked then sum=sum+2 
	if k.r24(1).checked then sum=sum+2 
	if k.r32(1).checked then sum=sum+1 
	if k.r38(1).checked then sum=sum+2 
	if k.r39(1).checked then sum=sum+1 
	if k.r69(1).checked then sum=sum+2 
	if k.r74(1).checked then sum=sum+1 
	if k.r80(1).checked then sum=sum+3 
	if k.r84(1).checked then sum=sum+2 
	if k.r85(1).checked then sum=sum+2 
	if k.r89(1).checked then sum=sum+1 
	if k.r98(1).checked then sum=sum+2 
	if k.r100(1).checked then sum=sum+3 
	if k.r112(1).checked then sum=sum+1 
	if k.r123(1).checked then sum=sum+3 
	if k.r126(1).checked then sum=sum+1 
	if k.r131(1).checked then sum=sum+2 
	if k.r138(1).checked then sum=sum+1 
	if k.r143(1).checked then sum=sum+1 
	if k.r146(1).checked then sum=sum+2 
	if k.r164(1).checked then sum=sum+2 
	
	if sum>36 then sum=36
	 pp=sum 
	r(24)="Delusional disorder" 
	w(24)=sum 
	
		
	 
end function