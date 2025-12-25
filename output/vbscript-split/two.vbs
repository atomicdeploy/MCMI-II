function two()
	sum=0 
	if k.r2(1).checked then sum=sum+1 
	if k.r3(1).checked then sum=sum+3 
	if k.r8(1).checked then sum=sum+3 
	if k.r14(0).checked then sum=sum+1 
	if k.r19(1).checked then sum=sum+2 
	if k.r21(0).checked then sum=sum+1 
	if k.r23(1).checked then sum=sum+2 
	if k.r25(1).checked then sum=sum+2 
	if k.r27(1).checked then sum=sum+2 
	if k.r28(0).checked then sum=sum+1 
	if k.r32(1).checked then sum=sum+2 
	if k.r34(1).checked then sum=sum+1 
	if k.r45(1).checked then sum=sum+1 
	if k.r47(1).checked then sum=sum+2 
	if k.r49(1).checked then sum=sum+3 
	if k.r56(1).checked then sum=sum+2 
	if k.r57(1).checked then sum=sum+2 
	if k.r63(1).checked then sum=sum+3 
	if k.r77(1).checked then sum=sum+3 
	if k.r81(1).checked then sum=sum+1 
	if k.r83(1).checked then sum=sum+2 
	if k.r85(1).checked then sum=sum+1 
	if k.r102(1).checked then sum=sum+2 
	if k.r106(1).checked then sum=sum+1 
	if k.r109(1).checked then sum=sum+1 
	if k.r110(1).checked then sum=sum+2 
	if k.r113(1).checked then sum=sum+1 
	if k.r115(1).checked then sum=sum+2 
	if k.r118(1).checked then sum=sum+2 
	if k.r120(1).checked then sum=sum+3 
	if k.r125(0).checked then sum=sum+1 
	if k.r133(1).checked then sum=sum+1 
	if k.r139(1).checked then sum=sum+1 
	if k.r141(1).checked then sum=sum+3 
	if k.r147(1).checked then sum=sum+1 
	if k.r150(1).checked then sum=sum+2 
	if k.r155(1).checked then sum=sum+2 
	if k.r158(1).checked then sum=sum+3 
	if k.r160(1).checked then sum=sum+1 
	if k.r163(0).checked then sum=sum+1 
	if k.r171(1).checked then sum=sum+2 
	
	if k.radgender(1).checked then
		if sum>46 then sum=46
	elseif sum>51 then sum=51
	end if
	two=sum 
	w(4)=sum 
	r(4)="Avoidant" 
end function