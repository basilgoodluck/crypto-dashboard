export const generateRandomCode = () => {
    const code = []
    for(let i = 0; i < 6; i++){
        code.push(Math.floor(Math.random() * 10))
    }
    return code.toString().split(",").join("")
}