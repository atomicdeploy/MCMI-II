function daadjust()
   dcorrect=rawbr(19)+xcor
   acorrect=rawbr(16)+xcor
	    if dcorrect=>85 then 
	 	  if acorrect<85 then  
	 	   	daadjust=dcorrect-85 
	 	  else 
		  	daadjust=acorrect+dcorrect-170 
		  end if 
	    else daadjust=0 
	    end if 
end function