//将'1,2,3'的字如串转化为tags字符串
import {tagOptions} from "../Config/Project/data";

export function convertTagstr(tags:string){
    let res = '';
    const tagsArray  = tags.split(',');
    tagOptions.forEach((tag:any)=>{
        if(tagsArray.some((e:any)=>e===tag.key))
            res += tag.value+' ';
    });
    return res;
}