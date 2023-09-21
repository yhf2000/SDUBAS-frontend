export function arraytostr(arr:any,s=','){
    let strTags = '';
    for(let i = 0;i < arr.length;i++)
    {
        strTags = strTags + arr[i];
        if(i !== arr.length-1)strTags = arr[i]+s;
    }
    return strTags;
}