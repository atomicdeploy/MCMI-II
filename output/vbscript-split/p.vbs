function p()
	sum=0 
	if k.r6(1).checked then sum=sum+1 
	if k.r12(1).checked then sum=sum+1 
	if k.r15(1).checked then sum=sum+2 
	if k.r16(1).checked then sum=sum+3 
	if k.r21(1).checked then sum=sum+1 
	if k.r22(1).checked then sum=sum+1 
	if k.r24(1).checked then sum=sum+2 
	if k.r30(1).checked then sum=sum+1 
	if k.r32(1).checked then sum=sum+3 
	if k.r37(1).checked then sum=sum+2 
	if k.r38(1).checked then sum=sum+3 
	if k.r39(1).checked then sum=sum+1 
	if k.r41(1).checked then sum=sum+1 
	if k.r43(1).checked then sum=sum+1 
	if k.r44(1).checked then sum=sum+1 
	if k.r46(1).checked then sum=sum+2 
	if k.r55(1).checked then sum=sum+1 
	if k.r61(1).checked then sum=sum+1 
	if k.r63(1).checked then sum=sum+1 
	if k.r64(1).checked then sum=sum+3 
	if k.r68(1).checked then sum=sum+1 
	if k.r74(1).checked then sum=sum+3 
	if k.r75(1).checked then sum=sum+1 
	if k.r80(1).checked then sum=sum+2 
	if k.r84(1).checked then sum=sum+3 
	if k.r85(1).checked then sum=sum+3 
	if k.r89(1).checked then sum=sum+2 
	if k.r98(1).checked then sum=sum+1 
	if k.r100(1).checked then sum=sum+2 
	if k.r103(1).checked then sum=sum+2 
	if k.r123(1).checked then sum=sum+2 
	if k.r126(1).checked then sum=sum+2 
	if k.r127(1).checked then sum=sum+1 
	if k.r129(1).checked then sum=sum+2 
	if k.r131(1).checked then sum=sum+2 
	if k.r135(1).checked then sum=sum+1 
	if k.r138(1).checked then sum=sum+1 
	if k.r143(1).checked then sum=sum+1 
	if k.r146(1).checked then sum=sum+3 
	if k.r163(1).checked then sum=sum+1 
	if k.r164(1).checked then sum=sum+3 
	if k.r165(1).checked then sum=sum+1 
	if k.r171(1).checked then sum=sum+1 
	if k.r172(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>62 then sum=62
	elseif sum>59 then sum=59
	end if
	p=sum 
	w(15)=sum 
	r(15)="Paranoid" 
end function