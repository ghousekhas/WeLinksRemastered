

export default function ymdToApp(date){
    console.log("dayte"+date)
    let dayte = date.substring(0,11)
    let arr = dayte.split("-");
    console.log(arr)
    let months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    return (arr[2].trim() + "-" + months[arr[1].replace(/^0+/, "")] + "-" + arr[0])
}

export function getDuration(startDate,endDate){
    const dateParts1 = startDate.substring(0,11).split('-');
    const dateParts2 = endDate.substring(0,11).split('-');
    const date1 = new Date(dateParts1[0],dateParts1[1]-1,dateParts1[2]);
    console.log('dateee',date1);
    const date2 = new Date(dateParts2[0],dateParts2[1]-1,dateParts2[2]);
    console.log('dateee',date2);
    return ((date2.getTime() - date1.getTime())/(1000*3600*24)).toString();


}