let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;
let l = 0;
let h;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);
        h = listVille.length - 1;
        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
            // ville.distanceFromGrenoble = 2;
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {

    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {
    
    lat1 = 45.166667;
    lon1 = 5.716667;

    lat2 = ville.latitude;
    lon2 = ville.longitude;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
    return j.distanceFromGrenoble > i.distanceFromGrenoble;
}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {
    let t = listVille[i];
    listVille[i] =  listVille[j];
    listVille[j] = t;
}

function sort(type) {
    switch (type) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            listVille = mergesort(listVille);
            break;
        case 'heap':
            heapsort(listVille);
            break;
        case 'quick':
            quicksort(l,h);
            break;
    }
}

function insertsort() {
    let temp,i,j;
    for(i = 1; i < listVille.length; i++){

        temp = listVille[i];
        j = i;
        while(j > 0 && listVille[j-1].distanceFromGrenoble > temp.distanceFromGrenoble){
            swap(j,j-1);
            j--;
        }
    }
}

function selectionsort() {
    for(let i = 0; i < listVille.length; i++){
        let minIndx = i;
        for(let j = i+1; j < listVille.length; j++){
            if(listVille[j].distanceFromGrenoble < listVille[minIndx].distanceFromGrenoble){
                minIndx = j;
            }
        }
        swap(i, minIndx);
    }
}

function bubblesort() {
    let isNotOrdred = true;
    let passage = 0;
    while(isNotOrdred){
        isNotOrdred = false;
        for(let i = 0; i < (listVille.length -1) - passage; i++){
            if(listVille[i].distanceFromGrenoble > listVille[i+1].distanceFromGrenoble){
                swap(i,i+1);
                isNotOrdred = true;
            }
        }
        passage++;        
    }
}

function shellsort() {
    let longeur = listVille.length;
    let n = 0;
    while(n < longeur/3){
        n = 3*n + 1;
    }

    while(n != 0){
        for(let i = n; i < longeur; i++){
            let valeur  = listVille[i];
            let j = i;
            while(j > n-1 && listVille[j-n].distanceFromGrenoble > valeur.distanceFromGrenoble){
                listVille[j] = listVille[j-n];
                j = j - n;
            }
            listVille[j] = valeur;
        }
        n = (n-1)/3;
    }
}
function mergesort(tab){
    if(tab.length <= 1){
        return tab
    }
    let midIndx = Math.floor(tab.length/2);
    return fusion(mergesort(tab.slice(0,midIndx)), mergesort(tab.slice(midIndx)));
}
function fusion(t1, t2){
    if(t1.length === 0){
        return t2;
    }else if(t2.length === 0){
        return t1;
    }

    if(t1[0].distanceFromGrenoble <= t2[0].distanceFromGrenoble){
        let temp = t1[0];
        let t = fusion(t1.slice(1), t2);
        t.unshift(temp);
        return t;
    }else{
        let temp = t2[0];
        let t = fusion(t1,t2.slice(1));
        t.unshift(temp);
        return t;
    }
}

// function mergesort(tab) {
//     if (tab.length < 2) {
//         return tab;
//     }
//     let midIndx = Math.floor(tab.length/2);
//     let rightTab = tab.slice(midIndx);
//     let leftTab = tab.slice(0, midIndx);
//     let partition = merge(leftTab.sort((a,b) => a.distanceFromGrenoble - b.distanceFromGrenoble),rightTab.sort((a,b) => a.distanceFromGrenoble - b.distanceFromGrenoble));
//     partition.unshift(0, tab.length);
//     tab.splice.apply(tab,partition);
//     return tab;
// }
// function merge(left, right){
//     let tab = [];
//     let a = 0;
//     let b = 0;
//     while(a < left.length && b < right.length){
//         if(left[a] < right[b]){
//             tab.push(left[a++]);
//         }else{
//             tab.push(right[b++]);
//         } 
//     }
//     return tab.concat(left.slice(a)).concat(right.slice(b));
// }


function heapsort(tab) {
    for(let i = 1; i < tab.length -1; i++){
        remonter(tab,i);
    }
    for(let i = tab.length - 1;0 <= i; i--){
        swap(0,i);
        descendre(tab,i,0);
    }

    
}
function remonter(){

}

function quicksort(a,b) {
    if(a < b){
        let p = partition(a, b);

        quicksort(a, p - 1);
        quicksort(p + 1, b);
    }
}
function partition(a, b){

    
    let pivot = b;
    let j = a;
    for(let i = a; i < b; i++){
        if(listVille[i].distanceFromGrenoble <= listVille[pivot].distanceFromGrenoble){
            swap(i, j);
            j++;
        }
    }
    swap(b,j);
    return j;
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
