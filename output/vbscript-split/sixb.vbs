function sixb()
	sum=0 
	if k.r1(1).checked then sum=sum+2 
	if k.r4(1).checked then sum=sum+3 
	if k.r7(1).checked then sum=sum+1 
	if k.r9(1).checked then sum=sum+3 
	if k.r12(1).checked then sum=sum+3 
	if k.r21(1).checked then sum=sum+2 
	if k.r30(1).checked then sum=sum+3 
	if k.r31(0).checked then sum=sum+1 
	if k.r32(1).checked then sum=sum+1 
	if k.r38(1).checked then sum=sum+1 
	if k.r40(1).checked then sum=sum+1 
	if k.r41(1).checked then sum=sum+3 
	if k.r42(0).checked then sum=sum+2 
	if k.r43(1).checked then sum=sum+1 
	if k.r44(1).checked then sum=sum+3 
	if k.r58(1).checked then sum=sum+1 
	if k.r64(1).checked then sum=sum+2 
	if k.r66(1).checked then sum=sum+1 
	if k.r71(0).checked then sum=sum+1 
	if k.r74(1).checked then sum=sum+2 
	if k.r77(0).checked then sum=sum+2 
	if k.r78(0).checked then sum=sum+2 
	if k.r80(1).checked then sum=sum+1 
	if k.r82(1).checked then sum=sum+2 
	if k.r84(1).checked then sum=sum+2 
	if k.r86(1).checked then sum=sum+1 
	if k.r91(1).checked then sum=sum+2 
	if k.r95(1).checked then sum=sum+1 
	if k.r101(1).checked then sum=sum+3 
	if k.r106(0).checked then sum=sum+1 
	if k.r107(1).checked then sum=sum+2 
	if k.r115(1).checked then sum=sum+2 
	if k.r121(1).checked then sum=sum+2 
	if k.r129(1).checked then sum=sum+2 
	if k.r134(1).checked then sum=sum+3 
	if k.r135(1).checked then sum=sum+1 
	if k.r142(1).checked then sum=sum+1 
	if k.r145(0).checked then sum=sum+1 
	if k.r146(1).checked then sum=sum+1 
	if k.r147(1).checked then sum=sum+1 
	if k.r148(1).checked then sum=sum+3 
	if k.r155(1).checked then sum=sum+2 
	if k.r163(1).checked then sum=sum+3 
	if k.r165(1).checked then sum=sum+1 
	if k.r166(1).checked then sum=sum+2 
	
	if k.radgender(1).checked then
		if sum>53 then sum=53
	elseif sum>62 then sum=62
	end if
	sixb=sum 
	w(9)=sum 
	r(9)="Aggressive/Sadistic" 
end function