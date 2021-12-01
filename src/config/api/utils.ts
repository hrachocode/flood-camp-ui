export  function responseHandler(data: any, link:string,history:any){
    if(data) {
        history.push(`/${link}`)
    }
}