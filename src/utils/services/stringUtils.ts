export const startCase = (string: string) =>{
  const newStringArray = string.toLowerCase().split('')
  const reducer = (prev:string, current:string, idx: number) => {
    if(idx === 1){
      return prev.toUpperCase() + current
    } else if(prev.charAt(idx-1) === ' '){
      return prev + current.toUpperCase()
    }else{
      return prev + current
    }
  }
  return newStringArray.reduce(reducer)

}