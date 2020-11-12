
    const calculateDeliveries = (startDate,endDate) => {
        // console.log('cd:'+ startDate)
 
         var  start = startDate.charAt(0)+startDate.charAt(1) + " " + startDate.charAt(3) + startDate.charAt(4)
           + startDate.charAt(5) +" " + startDate.charAt(startDate.length-4)  + startDate.charAt(startDate.length-3)
           + startDate.charAt(startDate.length-2)  + startDate.charAt(startDate.length-1) + " 00:00:00 GMT";
           var end = endDate.charAt(0)+endDate.charAt(1) + " " + endDate.charAt(3) + endDate.charAt(4)
           + endDate.charAt(5) +" " + endDate.charAt(endDate.length-4)  + endDate.charAt(endDate.length-3)
           + endDate.charAt(endDate.length-2)  + endDate.charAt(endDate.length-1) + " 00:00:00 GMT";
   
     
       
         
     
         dayString = dayString + dayString[0];
         const dayString1 = dayString[6] + dayString.substring(0,6)
 
        // console.log(dayString1)
       
         const daysOfTheWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
 
        
            for(i in dayString1)
            if(dayString1[i] == 'Y')
            selectedDays.push(daysOfTheWeek[i]);
 
        //    console.log(selectedDays)
 
 
             
         
      
         var count = 0;
         for(i=0;i<7;i++){
           var dateObj1 = new Date(Date.parse(start));
           var dateObj2 = new Date(Date.parse(end));
      
       if(dayString1[i] == 'Y'){
     
           var dayIndex = i;
       
           while ( dateObj1.getTime() <= dateObj2.getTime() )
           {
           
              if (dateObj1.getDay() == dayIndex )
              {
                 count++
              }
       
              dateObj1.setDate(dateObj1.getDate() + 1);
           }
       
          
       }
         }
         if(tag == 'Paper'){
             const monthNames = ["","January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"];
     let res,res1;
     for(i=1;i<=12;i++){
      //   let startDate = '18 March 2020'
         if(startDate.includes(monthNames[i])){
             res = (i < 10 ? "0" + i : i)
             break;
         }
     }
     for(i=1;i<=12;i++){
         if(endDate.includes(monthNames[i])){
             res1 = (i < 10 ? "0" + i : i)
             break;
         }
     }
      let sa = startDate.split(' ');
      let ea = endDate.split(' ');
      
      startDate = res + "/" + sa[0]+ "/"+sa[2];
      endDate = res1 + "/" + ea[0]+ "/"+ea[2];
      console.log(startDate+" OK")
      console.log(endDate+" OK")
 
 
      var d0 = new Date(startDate);
      var d1 = new Date(endDate);
 
       let ndays = 1 + Math.round((d1.getTime()-d0.getTime())/(24*3600*1000));
          var nsaturdays = Math.floor( (d0.getDay()+ndays) / 7 );
          console.log("Num of weekends")
           console.log(2*nsaturdays + (d0.getDay()==0) - (d1.getDay()==6));
         }
 
       numberOfDeliveries = count;
        return count;
   
       };