
function swap(A, i, j) {
    console.log("implement me");
}

function insertionSort(inputArr) {
    console.log("implement me");
}

function selectionSort(inputArr) {
    console.log("implement me");
}

function bubbleSort(inputArr) {
    console.log("implement me");
}

function shellSort(inputArr) {
    console.log("implement me");
}

function heapSort(inputArr, indexStart, indexEnd) {
    console.log("implement me");
}

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
swap(swappedList, 0, 1);

var insertionList = insertionSort([...list]);

var selectionList = selectionSort([...list]);

var bubbleList = bubbleSort([...list]);

var shellList = shellSort([...list]);

var heapList = heapSort([...list]);

// Affichage des résultats
console.log("Liste non triee");
console.log(list);
// console.log("Swap des deux premiers elements");
// console.log(swappedList);
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
