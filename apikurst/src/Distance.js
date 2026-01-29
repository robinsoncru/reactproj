

const Distance = (mot1,mot2) => {
    n = mot1.length + 1
    m = mot2.length + 1
    array = Array(n)
    col = Array(n)
    for (let i=0;i<n; i= i+1){
        array[i] = Array(m)
        array[i][0] = i
    }
    for (let j=1 ; j<m ; j=j+1){
        array[0][j] = j
        for (let i=1; i<n; i++){
            array[i][j] = 0
        }
    }

    let Cout = 0

    for(let i=1;i<n;i++){
        for (let j=1; j<m;j++){
            if(mot1[i-1] == mot2[j-1]){
                Cout = 0
            }
            else{
                Cout = 1

            }
            array[i][j] = Math.min(
                array[i-1][j] +1,
                array[i][j-1] +1,
                array[i-1][j-1] + Cout
            )
        }
    }
    
    return(array[n-1][m-1])
};


module.exports = Distance;