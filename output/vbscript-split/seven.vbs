function seven()
	sum=0 
	if k.r4(1).checked then sum=sum+1 
	if k.r7(0).checked then sum=sum+1 
	if k.r20(0).checked then sum=sum+2 
	if k.r21(1).checked then sum=sum+3 
	if k.r32(1).checked then sum=sum+1 
	if k.r39(1).checked then sum=sum+3 
	if k.r40(0).checked then sum=sum+1 
	if k.r43(0).checked then sum=sum+1 
	if k.r46(1).checked then sum=sum+3 
	if k.r48(0).checked then sum=sum+2 
	if k.r50(0).checked then sum=sum+1 
	if k.r60(0).checked then sum=sum+1 
	if k.r61(1).checked then sum=sum+3 
	if k.r64(1).checked then sum=sum+2 
	if k.r66(0).checked then sum=sum+1 
	if k.r74(1).checked then sum=sum+1 
	if k.r75(1).checked then sum=sum+3 
	if k.r77(0).checked then sum=sum+1 
	if k.r78(1).checked then sum=sum+1 
	if k.r81(1).checked then sum=sum+1 
	if k.r86(0).checked then sum=sum+2 
	if k.r88(1).checked then sum=sum+3 
	if k.r92(0).checked then sum=sum+1 
	if k.r95(0).checked then sum=sum+1 
	if k.r103(0).checked then sum=sum+1 
	if k.r111(0).checked then sum=sum+1 
	if k.r126(1).checked then sum=sum+3 
	if k.r128(0).checked then sum=sum+1 
	if k.r134(1).checked then sum=sum+2 
	if k.r138(1).checked then sum=sum+3 
	if k.r145(0).checked then sum=sum+2 
	if k.r148(1).checked then sum=sum+2 
	if k.r149(1).checked then sum=sum+3 
	if k.r153(1).checked then sum=sum+3 
	if k.r155(0).checked then sum=sum+1 
	if k.r159(1).checked then sum=sum+2 
	if k.r161(1).checked then sum=sum+2 
	if k.r163(1).checked then sum=sum+2 
	
	if k.radgender(1).checked then
		if sum>61 then sum=61
	elseif sum>60 then sum=60
	end if
	seven=sum 
	w(10)=sum 
	r(10)="Compulsive" 
end function