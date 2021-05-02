

export interface Country {
    name:string,
    code:string,
    countryCode:string,
    zipCode:string,
    areas: Districts[]
}

export interface Districts{
    name:string,
    code:string,
    countryCode:string
}