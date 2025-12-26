function buttvalidate()
 
  if    k.t3.value=""   then
  msgbox"لطفاً حداقل خانه مربوط به سن را پر کنيد"
   
  elseif not isnumeric(k.t3.value) then
   msgbox "لطفاً در خانه مربوط به سن يک عدد وارد کنيد"
  
  
  elseif k.t3.value>120 or k.t3.value<13 then 
  msgbox "سن شما برای اين تست مناسب نيست"
  
 
 elseif not  k.radgender(0).checked and not k.radgender(1).checked then
 msgbox "لطفاً دايره مربوط به جنسيت را پر کنيد"
  
else
 buttclick()
 end if
 
end function