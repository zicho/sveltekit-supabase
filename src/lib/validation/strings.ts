export function isNullOrEmpty(val: string) {

    if(!val) return true; 
    else if (val == '') return true
    else if (val.length == 0) return true

    return false;
}