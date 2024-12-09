export const generateRandomCode = () => {
    const code = ""
    for(let i = 0; i < 6; i++){
        code += (Math.floor(Math.random() * 10))
    }
}