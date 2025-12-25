function sixa()
	sum=0 
	if k.r1(1).checked then sum=sum+2 
	if k.r7(1).checked then sum=sum+3 
	if k.r12(1).checked then sum=sum+2 
	if k.r15(1).checked then sum=sum+1 
	if k.r20(1).checked then sum=sum+2 
	if k.r22(1).checked then sum=sum+2 
	if k.r32(1).checked then sum=sum+2 
	if k.r34(0).checked then sum=sum+1 
	if k.r38(1).checked then sum=sum+2 
	if k.r40(1).checked then sum=sum+3 
	if k.r42(0).checked then sum=sum+2 
	if k.r43(1).checked then sum=sum+2 
	if k.r44(1).checked then sum=sum+1 
	if k.r48(1).checked then sum=sum+1 
	if k.r55(1).checked then sum=sum+2 
	if k.r64(1).checked then sum=sum+1 
	if k.r73(1).checked then sum=sum+2 
	if k.r74(1).checked then sum=sum+2 
	if k.r77(0).checked then sum=sum+1 
	if k.r78(0).checked then sum=sum+2 
	if k.r80(1).checked then sum=sum+2 
	if k.r81(0).checked then sum=sum+2 
	if k.r85(1).checked then sum=sum+1 
	if k.r86(1).checked then sum=sum+2 
	if k.r87(1).checked then sum=sum+2 
	if k.r91(1).checked then sum=sum+2 
	if k.r92(1).checked then sum=sum+3 
	if k.r94(1).checked then sum=sum+3 
	if k.r101(1).checked then sum=sum+1 
	if k.r103(1).checked then sum=sum+3 
	if k.r104(1).checked then sum=sum+1 
	if k.r111(1).checked then sum=sum+1 
	if k.r113(1).checked then sum=sum+1 
	if k.r116(1).checked then sum=sum+3 
	if k.r129(1).checked then sum=sum+2 
	if k.r130(1).checked then sum=sum+3 
	if k.r140(1).checked then sum=sum+1 
	if k.r142(1).checked then sum=sum+2 
	if k.r144(1).checked then sum=sum+2 
	if k.r147(1).checked then sum=sum+3 
	if k.r157(1).checked then sum=sum+1 
	if k.r162(1).checked then sum=sum+3 
	if k.r165(1).checked then sum=sum+2 
	if k.r171(1).checked then sum=sum+1 
	if k.r172(1).checked then sum=sum+3 
	
	if k.radgender(1).checked then
		if sum>54 then sum=54
	elseif sum>56 then sum=56
	end if
	sixa=sum 
	w(8)=sum 
	r(8)="Antisocial" 
end function