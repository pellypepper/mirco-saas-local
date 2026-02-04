

export function Capitalize( fullName : string){
 const formattedFullName = fullName
      .trim()
      .split(' ')
      .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(' ');


    return formattedFullName;
}