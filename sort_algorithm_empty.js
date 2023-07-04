

function insertionSort(inputArr) {
    console.log("before "+inputArr);
    let temp,i,j;
    for(i = 1; i < inputArr.length; i++){

        temp = inputArr[i];
        j = i;
        while(j > 0 && inputArr[j-1] > temp){
            inputArr[j] = inputArr[j-1];
            inputArr[j-1] = temp;
            // swap(inputArr,i,j);
            j--;
        }
    }
}
function swap(A, i, j) {
    let temp = A[i];
    console.log(i,j,temp);
    
    A[j] =  A[j-1];
    A[j-1] = temp;
}
    


// function selectionSort(inputArr) {
//     console.log("implement me");
// }

// function bubbleSort(inputArr) {
//     console.log("implement me");
// }

// function shellSort(inputArr) {
//     console.log("implement me");
// }

// function heapSort(inputArr, indexStart, indexEnd) {
//     console.log("implement me");
// }

/////////////////////////////////////////////////////////////
//                          START                       ////
////////////////////////////////////////////////////////////

// Création de list

var list = [];
let size = 8;
for (let i = 0; i < size; i++) {
    list.push(Math.floor(Math.random() * size * 2));
}


// Calculs, performances

var swappedList = [...list];
// swap(swappedList, 0, 1);

var insertionList = insertionSort([...list]);

// var selectionList = selectionSort([...list]);

// var bubbleList = bubbleSort([...list]);

// var shellList = shellSort([...list]);

// var heapList = heapSort([...list]);

// Affichage des résultats
console.log("Liste non triee");
console.log(list);
console.log("Swap des deux premiers elements");
console.log(swappedList);
// console.log("Insertion");
// console.log(insertionList)
// console.log("Selection");
// console.log(selectionList);
// console.log("Bubble");
// console.log(bubbleList);
// console.log("Shell");
//console.log(shellList);
// console.log("Heap");
// console.log(heapList);
