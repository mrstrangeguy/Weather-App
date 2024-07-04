interface MainCardType {
    title:string | undefined,
    mainContentDetails:{
       img: string | undefined
       heading: string | undefined,
       description: string | undefined
    },
    sideBarContentDetails:{img:string,details:string}[]
              
    buttontext:string | undefined
}   

export type MainCardsType = {
    mainCard1:MainCardType,
    mainCard2:MainCardType
}