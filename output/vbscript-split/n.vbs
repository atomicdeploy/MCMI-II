function n()
	sum=0 
	if k.r11(1).checked then sum=sum+3 
	if k.r14(1).checked then sum=sum+2 
	if k.r17(1).checked then sum=sum+1 
	if k.r19(0).checked then sum=sum+1 
	if k.r20(1).checked then sum=sum+2 
	if k.r28(1).checked then sum=sum+2 
	if k.r37(1).checked then sum=sum+1 
	if k.r40(1).checked then sum=sum+1 
	if k.r42(0).checked then sum=sum+1 
	if k.r50(1).checked then sum=sum+2 
	if k.r58(1).checked then sum=sum+1 
	if k.r60(1).checked then sum=sum+2 
	if k.r66(1).checked then sum=sum+1 
	if k.r67(1).checked then sum=sum+1 
	if k.r73(1).checked then sum=sum+1 
	if k.r86(1).checked then sum=sum+2 
	if k.r89(1).checked then sum=sum+1 
	if k.r93(1).checked then sum=sum+3 
	if k.r95(1).checked then sum=sum+1 
	if k.r98(1).checked then sum=sum+1 
	if k.r101(1).checked then sum=sum+1 
	if k.r103(1).checked then sum=sum+2 
	if k.r111(1).checked then sum=sum+1 
	if k.r121(1).checked then sum=sum+1 
	if k.r125(1).checked then sum=sum+2 
	if k.r127(1).checked then sum=sum+1 
	if k.r128(1).checked then sum=sum+2 
	if k.r131(1).checked then sum=sum+1 
	if k.r134(1).checked then sum=sum+2 
	if k.r137(1).checked then sum=sum+2 
	if k.r151(1).checked then sum=sum+3 
	if k.r158(0).checked then sum=sum+1 
	if k.r161(0).checked then sum=sum+1 
	if k.r166(1).checked then sum=sum+1 
	if k.r170(1).checked then sum=sum+2 
	if k.r172(1).checked then sum=sum+1 
	if k.r174(1).checked then sum=sum+3 
	
	if k.radgender(1).checked then
		if sum>44 then sum=44
	elseif sum>45 then sum=45
	end if
	n=sum 
	w(18)=sum 
	r(18)="Bipolar:Manic" 
end function