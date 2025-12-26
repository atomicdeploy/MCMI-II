function eightb()
	sum=0 
	if k.r8(1).checked then sum=sum+1 
	if k.r10(1).checked then sum=sum+2 
	if k.r16(1).checked then sum=sum+2 
	if k.r18(1).checked then sum=sum+1 
	if k.r23(1).checked then sum=sum+3 
	if k.r25(1).checked then sum=sum+1 
	if k.r28(1).checked then sum=sum+2 
	if k.r31(1).checked then sum=sum+1 
	if k.r42(1).checked then sum=sum+2 
	if k.r45(1).checked then sum=sum+2 
	if k.r51(1).checked then sum=sum+2 
	if k.r54(1).checked then sum=sum+2 
	if k.r56(1).checked then sum=sum+2 
	if k.r57(1).checked then sum=sum+3 
	if k.r63(1).checked then sum=sum+1 
	if k.r65(1).checked then sum=sum+3 
	if k.r71(1).checked then sum=sum+1 
	if k.r73(1).checked then sum=sum+1 
	if k.r74(0).checked then sum=sum+1 
	if k.r77(1).checked then sum=sum+2 
	if k.r81(1).checked then sum=sum+1 
	if k.r82(1).checked then sum=sum+1 
	if k.r99(1).checked then sum=sum+1 
	if k.r106(1).checked then sum=sum+2 
	if k.r110(1).checked then sum=sum+3 
	if k.r115(1).checked then sum=sum+2 
	if k.r120(1).checked then sum=sum+2 
	if k.r121(1).checked then sum=sum+3 
	if k.r128(1).checked then sum=sum+1 
	if k.r132(1).checked then sum=sum+2 
	if k.r133(1).checked then sum=sum+1 
	if k.r139(1).checked then sum=sum+3 
	if k.r141(1).checked then sum=sum+1 
	if k.r145(1).checked then sum=sum+2 
	if k.r154(1).checked then sum=sum+3 
	if k.r155(1).checked then sum=sum+2 
	if k.r167(1).checked then sum=sum+1 
	if k.r168(1).checked then sum=sum+3 
	if k.r171(1).checked then sum=sum+1 
	if k.r173(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>43 then sum=43
	elseif sum>48 then sum=48
	end if
	eightb=sum 
	w(12)=sum 
	r(12)="Self-defeating" 
end function