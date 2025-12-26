function y()
	sum=0 
	if k.r4(1).checked then sum=sum+1 
	if k.r14(1).checked then sum=sum+1 
	if k.r34(1).checked then sum=sum+1 
	if k.r39(1).checked then sum=sum+1 
	if k.r60(1).checked then sum=sum+1 
	if k.r61(1).checked then sum=sum+1 
	if k.r75(1).checked then sum=sum+1 
	if k.r78(1).checked then sum=sum+1 
	if k.r86(1).checked then sum=sum+1 
	if k.r88(1).checked then sum=sum+1 
	if k.r89(1).checked then sum=sum+1 
	if k.r93(1).checked then sum=sum+1 
	if k.r103(1).checked then sum=sum+1 
	if k.r106(1).checked then sum=sum+1 
	if k.r122(1).checked then sum=sum+1 
	if k.r125(1).checked then sum=sum+1 
	if k.r126(1).checked then sum=sum+1 
	if k.r137(1).checked then sum=sum+1 
	if k.r138(1).checked then sum=sum+1 
	if k.r149(1).checked then sum=sum+1 
	if k.r153(1).checked then sum=sum+1 
	if k.r159(1).checked then sum=sum+1 
	if k.r166(1).checked then sum=sum+1 
	
	if k.radgender(1).checked then
		if sum>22 then sum=22
	elseif sum>21 then sum=21
	end if
	y=sum 
	w(1)=sum 
	r(1)="Desirability" 
end function