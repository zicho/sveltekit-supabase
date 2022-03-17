export function isNullOrEmpty(val: string) {

    if(!val) return true; 
    else if (val == undefined || val == null) return true
    else if (val == '') return true
    else if (val.length == 0) return true
    else if (!/\S/.test(val)) return true;

    return false;
}