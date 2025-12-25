function four()
	sum=0 
	if k.r3(0).checked then sum=sum+1 
	if k.r7(1).checked then sum=sum+1 
	if k.r9(1).checked then sum=sum+2 
	if k.r14(1).checked then sum=sum+3 
	if k.r19(0).checked then sum=sum+1 
	if k.r20(1).checked then sum=sum+3 
	if k.r28(1).checked then sum=sum+3 
	if k.r37(1).checked then sum=sum+1 
	if k.r39(0).checked then sum=sum+1 
	if k.r40(1).checked then sum=sum+1 
	if k.r41(1).checked then sum=sum+1 
	if k.r42(1).checked then sum=sum+2 
	if k.r43(1).checked then sum=sum+2 
	if k.r48(1).checked then sum=sum+3 
	if k.r51(0).checked then sum=sum+1 
	if k.r56(1).checked then sum=sum+1 
	if k.r60(1).checked then sum=sum+3 
	if k.r61(0).checked then sum=sum+2 
	if k.r66(1).checked then sum=sum+2 
	if k.r77(0).checked then sum=sum+1 
	if k.r86(1).checked then sum=sum+3 
	if k.r89(1).checked then sum=sum+1 
	if k.r91(1).checked then sum=sum+1 
	if k.r95(1).checked then sum=sum+1 
	if k.r103(1).checked then sum=sum+2 
	if k.r111(1).checked then sum=sum+3 
	if k.r125(1).checked then sum=sum+3 
	if k.r126(0).checked then sum=sum+1 
	if k.r128(1).checked then sum=sum+1 
	if k.r130(1).checked then sum=sum+1 
	if k.r133(1).checked then sum=sum+2 
	if k.r137(1).checked then sum=sum+3 
	if k.r142(1).checked then sum=sum+1 
	if k.r158(0).checked then sum=sum+2 
	if k.r162(1).checked then sum=sum+1 
	if k.r166(1).checked then sum=sum+2 
	if k.r170(1).checked then sum=sum+3 
	if k.r171(1).checked then sum=sum+1 
	if k.r172(1).checked then sum=sum+1 
	if k.r173(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>58 then sum=58
	elseif sum>52 then sum=52
	end if
	four=sum 
	w(6)=sum 
	r(6)="Histrionic" 
end function