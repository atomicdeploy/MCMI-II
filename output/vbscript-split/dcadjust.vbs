function dcadjust()
 
biggest=0 
bigger=0 
for j= 3 to 12 
   
  if biggest<fordc(j) then 
	biggest=fordc(j) 
	g=j 
  end if 
next 
for j=3 to 12 
   if j=g then j=j+1 
   if bigger<fordc(j) then  
      bigger=fordc(j) 
      gp=j 
   end if 
    
next 
    
end function