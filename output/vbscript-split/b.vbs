function b()
	sum=0 
	if k.r8(0).checked then sum=sum+1 
	if k.r17(1).checked then sum=sum+3 
	if k.r18(1).checked then sum=sum+2 
	if k.r22(1).checked then sum=sum+1 
	if k.r23(1).checked then sum=sum+1 
	if k.r25(1).checked then sum=sum+1 
	if k.r27(1).checked then sum=sum+1 
	if k.r35(1).checked then sum=sum+1 
	if k.r40(1).checked then sum=sum+1 
	if k.r46(1).checked then sum=sum+1 
	if k.r52(0).checked then sum=sum+2 
	if k.r54(1).checked then sum=sum+2 
	if k.r65(1).checked then sum=sum+1 
	if k.r70(1).checked then sum=sum+1 
	if k.r73(1).checked then sum=sum+2 
	if k.r80(1).checked then sum=sum+1 
	if k.r87(1).checked then sum=sum+3 
	if k.r93(1).checked then sum=sum+1 
	if k.r95(1).checked then sum=sum+2 
	if k.r96(1).checked then sum=sum+1 
	if k.r97(1).checked then sum=sum+2 
	if k.r103(1).checked then sum=sum+1 
	if k.r104(1).checked then sum=sum+1 
	if k.r105(1).checked then sum=sum+2 
	if k.r108(1).checked then sum=sum+1 
	if k.r109(1).checked then sum=sum+2 
	if k.r111(1).checked then sum=sum+1 
	if k.r114(1).checked then sum=sum+1 
	if k.r117(1).checked then sum=sum+1 
	if k.r119(1).checked then sum=sum+3 
	if k.r122(0).checked then sum=sum+2 
	if k.r125(1).checked then sum=sum+1 
	if k.r128(1).checked then sum=sum+1 
	if k.r130(1).checked then sum=sum+1 
	if k.r135(1).checked then sum=sum+1 
	if k.r137(1).checked then sum=sum+1 
	if k.r140(1).checked then sum=sum+1 
	if k.r144(1).checked then sum=sum+2 
	if k.r149(1).checked then sum=sum+1 
	if k.r155(1).checked then sum=sum+1 
	if k.r157(1).checked then sum=sum+3 
	if k.r159(1).checked then sum=sum+1 
	if k.r162(1).checked then sum=sum+1 
	if k.r165(1).checked then sum=sum+1 
	if k.r171(1).checked then sum=sum+1 
	if k.r175(1).checked then sum=sum+2 
	
	if k.radgender(1).checked then
		if sum>51 then sum=51
	elseif sum>50 then sum=50
	end if
	b=sum 
	w(20)=sum 
	r(20)="Alcohol dependence" 
end function