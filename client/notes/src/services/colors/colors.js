// Funkcja dostaje string określający wybrany kolor
// Zmienia go w taki sposób że wynikowy kolor 
// Ciemniejszy o wybraną liczbę poziomów
const color_signs = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

export const colorMoreDark = (color,level) =>{
    // console.log('Kolor pzed zmianą :',color);
    
    let signs = color.split('');
    let oldColor = color;
    let newColor = ['#'];
    

    for (let i = 0; i < level; i++) {
        
        for (let index = 0; index < signs.length; index++) {
            const element = signs[index];
            if(element === '#' || element === '0'){
                continue;
            }
            else{
               let indexOf = color_signs.indexOf(element);
                newColor.push(color_signs[indexOf-1]);
            }
            
        }
        oldColor = newColor.join('');
        signs = [...newColor];
        newColor = ['#'];
    }

    // console.log('Kolor po zmianie: ',oldColor);
    return oldColor;
    
}

