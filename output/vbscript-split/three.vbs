function three()
	sum=0 
	if k.r4(0).checked then sum=sum+2 
	if k.r7(0).checked then sum=sum+1 
	if k.r10(1).checked then sum=sum+3 
	if k.r12(0).checked then sum=sum+1 
	if k.r21(0).checked then sum=sum+1 
	if k.r28(0).checked then sum=sum+1 
	if k.r31(1).checked then sum=sum+3 
	if k.r34(1).checked then sum=sum+2 
	if k.r40(0).checked then sum=sum+1 
	if k.r41(0).checked then sum=sum+1 
	if k.r42(1).checked then sum=sum+3 
	if k.r43(0).checked then sum=sum+1 
	if k.r49(1).checked then sum=sum+1 
	if k.r54(1).checked then sum=sum+1 
	if k.r57(1).checked then sum=sum+2 
	if k.r60(1).checked then sum=sum+2 
	if k.r74(0).checked then sum=sum+1 
	if k.r75(1).checked then sum=sum+1 
	if k.r77(1).checked then sum=sum+2 
	if k.r78(1).checked then sum=sum+3 
	if k.r81(1).checked then sum=sum+2 
	if k.r91(0).checked then sum=sum+1 
	if k.r92(0).checked then sum=sum+1 
	if k.r97(1).checked then sum=sum+2 
	if k.r101(0).checked then sum=sum+1 
	if k.r106(1).checked then sum=sum+3 
	if k.r110(1).checked then sum=sum+1 
	if k.r125(1).checked then sum=sum+1 
	if k.r133(1).checked then sum=sum+3 
	if k.r145(1).checked then sum=sum+3 
	if k.r147(0).checked then sum=sum+1 
	if k.r149(1).checked then sum=sum+1 
	if k.r159(1).checked then sum=sum+3 
	if k.r162(0).checked then sum=sum+1 
	if k.r163(0).checked then sum=sum+1 
	if k.r168(1).checked then sum=sum+1 
	if k.r173(1).checked then sum=sum+3 
	
	if k.radgender(1).checked then
		if sum>51 then sum=51
	elseif sum>53 then sum=53
	end if
	three=sum 
	w(5)=sum 
	r(5)="Dependent" 
end function