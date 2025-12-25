function d()
	sum=0 
	if k.r5(1).checked then sum=sum+2 
	if k.r8(1).checked then sum=sum+2 
	if k.r25(1).checked then sum=sum+1 
	if k.r26(1).checked then sum=sum+2 
	if k.r27(1).checked then sum=sum+3 
	if k.r36(1).checked then sum=sum+2 
	if k.r41(0).checked then sum=sum+1 
	if k.r45(1).checked then sum=sum+3 
	if k.r46(1).checked then sum=sum+1 
	if k.r51(1).checked then sum=sum+2 
	if k.r53(1).checked then sum=sum+2 
	if k.r54(1).checked then sum=sum+3 
	if k.r56(1).checked then sum=sum+1 
	if k.r59(1).checked then sum=sum+2 
	if k.r65(1).checked then sum=sum+2 
	if k.r71(1).checked then sum=sum+2 
	if k.r72(1).checked then sum=sum+2 
	if k.r76(1).checked then sum=sum+2 
	if k.r79(1).checked then sum=sum+3 
	if k.r83(1).checked then sum=sum+2 
	if k.r86(0).checked then sum=sum+1 
	if k.r96(1).checked then sum=sum+2 
	if k.r97(1).checked then sum=sum+3 
	if k.r99(1).checked then sum=sum+3 
	if k.r107(1).checked then sum=sum+1 
	if k.r108(1).checked then sum=sum+3 
	if k.r109(1).checked then sum=sum+2 
	if k.r110(1).checked then sum=sum+1 
	if k.r132(1).checked then sum=sum+3 
	if k.r136(1).checked then sum=sum+2 
	if k.r139(1).checked then sum=sum+1 
	if k.r154(1).checked then sum=sum+2 
	if k.r155(1).checked then sum=sum+1 
	if k.r166(0).checked then sum=sum+2 
	if k.r167(1).checked then sum=sum+1 
	if k.r168(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>56 then sum=56
	elseif sum>57 then sum=57
	end if
	d=sum 
	w(19)=sum 
	r(19)="Dysthymia" 
end function