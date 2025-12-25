function eighta()
	sum=0 
	if k.r1(1).checked then sum=sum+1 
	if k.r4(1).checked then sum=sum+1 
	if k.r9(1).checked then sum=sum+2 
	if k.r12(1).checked then sum=sum+1 
	if k.r16(1).checked then sum=sum+2 
	if k.r21(1).checked then sum=sum+1 
	if k.r22(1).checked then sum=sum+3 
	if k.r23(1).checked then sum=sum+1 
	if k.r25(1).checked then sum=sum+1 
	if k.r28(1).checked then sum=sum+2 
	if k.r43(1).checked then sum=sum+2 
	if k.r50(1).checked then sum=sum+3 
	if k.r51(1).checked then sum=sum+1 
	if k.r55(1).checked then sum=sum+3 
	if k.r58(1).checked then sum=sum+1 
	if k.r61(0).checked then sum=sum+1 
	if k.r64(1).checked then sum=sum+2 
	if k.r66(1).checked then sum=sum+3 
	if k.r73(1).checked then sum=sum+2 
	if k.r74(1).checked then sum=sum+2 
	if k.r77(1).checked then sum=sum+2 
	if k.r82(1).checked then sum=sum+2 
	if k.r86(1).checked then sum=sum+2 
	if k.r95(1).checked then sum=sum+3 
	if k.r101(1).checked then sum=sum+2 
	if k.r104(1).checked then sum=sum+3 
	if k.r107(1).checked then sum=sum+3 
	if k.r110(1).checked then sum=sum+1 
	if k.r115(1).checked then sum=sum+2 
	if k.r120(1).checked then sum=sum+1 
	if k.r123(1).checked then sum=sum+2 
	if k.r128(1).checked then sum=sum+2 
	if k.r129(1).checked then sum=sum+1 
	if k.r135(1).checked then sum=sum+3 
	if k.r139(1).checked then sum=sum+1 
	if k.r149(0).checked then sum=sum+2 
	if k.r155(1).checked then sum=sum+2 
	if k.r156(1).checked then sum=sum+3 
	if k.r159(0).checked then sum=sum+2 
	if k.r165(1).checked then sum=sum+3 
	if k.r171(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>55 then sum=55
	elseif sum>53 then sum=53
	end if
	eighta=sum 
	w(11)=sum 
	r(11)="Passive-Agressive" 
end function