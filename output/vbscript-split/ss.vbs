function ss()
	sum=0 
	if k.r3(1).checked then sum=sum+1 
	if k.r8(1).checked then sum=sum+1 
	if k.r13(1).checked then sum=sum+1 
	if k.r19(1).checked then sum=sum+1 
	if k.r23(1).checked then sum=sum+1 
	if k.r24(1).checked then sum=sum+1 
	if k.r29(1).checked then sum=sum+1 
	if k.r31(1).checked then sum=sum+1 
	if k.r38(1).checked then sum=sum+2 
	if k.r68(1).checked then sum=sum+2 
	if k.r69(1).checked then sum=sum+2 
	if k.r74(1).checked then sum=sum+1 
	if k.r77(1).checked then sum=sum+2 
	if k.r80(1).checked then sum=sum+2 
	if k.r82(1).checked then sum=sum+1 
	if k.r83(1).checked then sum=sum+2 
	if k.r85(1).checked then sum=sum+2 
	if k.r98(1).checked then sum=sum+3 
	if k.r102(1).checked then sum=sum+2 
	if k.r109(1).checked then sum=sum+3 
	if k.r112(1).checked then sum=sum+2 
	if k.r115(1).checked then sum=sum+2 
	if k.r120(1).checked then sum=sum+2 
	if k.r124(1).checked then sum=sum+3 
	if k.r127(1).checked then sum=sum+3 
	if k.r141(1).checked then sum=sum+1 
	if k.r146(1).checked then sum=sum+2 
	if k.r147(1).checked then sum=sum+1 
	if k.r156(1).checked then sum=sum+1 
	if k.r160(1).checked then sum=sum+3 
	if k.r161(1).checked then sum=sum+1 
	if k.r164(1).checked then sum=sum+2 
	if k.r167(1).checked then sum=sum+3 
	
	if k.radgender(1).checked then
		if sum>39 then sum=39
	elseif sum>47 then sum=47
	end if
	ss=sum 
	r(22)="Thought Disorder" 
	w(22)=sum 
end function