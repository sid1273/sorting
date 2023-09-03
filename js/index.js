import { heading } from "./heading.js"
window.addEventListener("DOMContentLoaded", heading(0));
//returns random value in  a range
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let resetbuttons= Array.from( document.getElementsByClassName("resetbutton"));
resetbuttons.forEach( (resetbtn)=> {resetbtn.addEventListener("click", ()=>{location.reload()} ) } )
//disable all button on start of a sorting
function DisableAllSortButtonOnStart() {
    let allsortbutton = document.getElementsByClassName("button");
    for (let i = 0; i < allsortbutton.length; i++) {
        allsortbutton[i].disabled = true;
    }
}
//enable  all button after   sorting
function EnableAllSortButtonOnStart() {
    let allsortbutton = document.getElementsByClassName("button");
    for (let i = 0; i < allsortbutton.length; i++) {
        allsortbutton[i].disabled = false;
    }
}

//clear pre exisiting bars
function clearbars(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

//simple swap function
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//to keep pausing the sorting function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//to change color of element
function changebgcolor(ele, color) {
    ele.style.backgroundColor = color;
}


// //to set height of element on button click
function OpenandCloseSortContainer(currentid) {
    let currentele = document.getElementById(currentid + "sort");
    let currentsort = currentele.firstElementChild;
    let allsort = document.querySelectorAll(".sort-container");
    // close container of all other buttons and clear their bars 
    for (let i = 0; i < allsort.length; i++) {
        if (allsort[i] !== currentsort) {
            if (!allsort[i].classList.contains("hidden")) {
                allsort[i].classList.add("hidden");
            }
        }
    }
    if (currentsort.classList.contains("hidden")) {
        currentsort.classList.remove("hidden");
    }
    else {
    }
}

//pause the algorithm
async function pause(sortname){
    switch(sortname) {
        case "bubble":
            while (bubblepause) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
        case "selection":
            while (selectionpause) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
        case "insertion":
            while (insertionpause) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
        case "quick":
            while (quickpause) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
        case "merge":
            while (mergepause) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
        case "heap":
            while (heappause) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            break;
    }
    
}

//to swap elements with animation
async function swapelement(ele1, ele2, speed,sortname) {
    let ele1id = ele1.id;
    let ele2id = ele2.id;
    let flex = ele1.parentNode;
    let ele1next = ele1.nextSibling
    let ele2next = ele2.nextSibling

    //changing attributes as they are getting swapped
    ele1.setAttribute("id", ele2id);
    ele2.setAttribute("id", ele1id);

    let difference = ele2.offsetLeft - ele1.offsetLeft;


    if (ele1id.slice(0, 4) === "ibar") {
        ele1.style.transform = "translate(" + difference + "px,-50px) ";
        ele2.style.transform = "translateX(" + (-difference) + "px)";
        await sleep(speed / 4);
        ele1.style.transform = "translateY(-50px)";
        ele2.style.transform = "";
    }

    else if (ele1id.slice(0, 4) === "qbar") {
        ele1.style.transform = "translate(" + difference + "px,-50px) ";
        ele2.style.transform = "translate(" + (-difference) + "px,-50px)";
        await sleep(speed / 4);
        ele1.style.transform = "translateY(-30px)";
        ele2.style.transform = "translateY(-30px)";
    }

    else {
        ele1.style.transform = "translate(" + difference + "px,-50px) ";
        ele2.style.transform = "translate(" + (-difference) + "px,-50px)";
        await sleep(speed / 4);
        ele1.style.transform = "";
        ele2.style.transform = "";
    }



    // fitting them correctly as per their pos in flexbox
    flex.insertBefore(ele1, ele2next);
    flex.insertBefore(ele2, ele1next);
}

async function createbars(ele, barname, number, buttonname) {
    OpenandCloseSortContainer(ele.id);
    let test = document.getElementById("test" + number)
    document.getElementById("size"+number).disabled=false;
    clearbars(test);
    let randarr = [];
    const len = document.getElementById("size"+number).value;
    for (let i = 0; i < len; i++) {
        randarr.push(getRandom(1, 200));
    };
    let width = (test.offsetWidth / randarr.length) - 10;
    for (let i = 0; i < randarr.length; i++) {
        let newbar = document.createElement("div");
        let value = randarr[i]
        newbar.innerHTML = value;
        newbar.style.height = value + "px";
        newbar.style.width = width + "px";
        newbar.classList.add("bar");
        newbar.setAttribute("id", barname + i);
        test.appendChild(newbar);
    }
    document.getElementById("array" + number).innerHTML = "Input Array : " + randarr;
    document.getElementById("result" + number).innerHTML = "";
    document.getElementById(buttonname+"start").disabled = false;
    document.getElementById(buttonname+"start").innerHTML = "Start";
    document.getElementById(buttonname+"pause").innerHTML = "Pause";
}

let bubblepause = false;
let selectionpause = false;
let insertionpause = false;
let quickpause = false;
let mergepause = false;
let heappause = false;

function pausetoggle(event){
    let button = event.target
    let currentvalue = button.innerHTML;
    if (currentvalue === "Pause") {
        button.innerHTML = "Resume";
        bubblepause = true;
        selectionpause = true;
        insertionpause = true;
        quickpause = true;
        mergepause = true;
        heappause = true;
    }
    else {
        button.innerHTML = "Pause";
        bubblepause = false;
        selectionpause = false;
        insertionpause = false;
        quickpause = false;
        mergepause = true;
    }
}

//click on pause button
document.getElementById("bubblepause").addEventListener("click", (event) => {
    pausetoggle(event);
})
document.getElementById("selectionpause").addEventListener("click", (event) => {
    pausetoggle(event);
})
document.getElementById("insertionpause").addEventListener("click", (event) => {
    pausetoggle(event);
})
document.getElementById("quickpause").addEventListener("click", (event) => {
    pausetoggle(event);
})
document.getElementById("mergepause").addEventListener("click", (event) => {
    pausetoggle(event);
})

//change size from range
document.getElementById("size1").addEventListener("input", function(){
    createbars(document.getElementById("bubble"), "bbar", 1, "bubble");
} );
document.getElementById("size2").addEventListener("input", function(){
    createbars(document.getElementById("selection"), "sbar", 2, "selection");
} );
document.getElementById("size3").addEventListener("input", function(){
    createbars(document.getElementById("insertion"), "ibar", 3, "insertion")

} );
document.getElementById("size4").addEventListener("input", function(){
    createbars(document.getElementById("quick"), "qbar", 4, "quick");
} );
document.getElementById("size5").addEventListener("input", function(){
    createbars(document.getElementById("merge"), "mbar", 5, "merge");

} );



//==============================================================================================================================================================================
//==================================================================================Bubble sort=================================================================================
//click on bubble sort 
document.getElementById("bubble").addEventListener("click", async (event) => {
    heading(1);
    createbars(event.target, "bbar", 1, "bubble");

})
//bubble sort 
let bubblestart = document.getElementById("bubblestart");
bubblestart.addEventListener('click', async (event) => {
    if(event.target.innerHTML==="New Input Array"){
        createbars(document.getElementById("bubble"), "bbar", 1, "bubble");
    }
    else{
    
    DisableAllSortButtonOnStart();
    event.target.disabled = true;

    let pausebutton = document.getElementById("bubblepause");
    pausebutton.disabled = false;
    document.getElementById("size1").disabled=true;

    let string = document.getElementById("array1").innerHTML.slice(14);
    let arr = JSON.parse("[" + string + "]");

    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            
            let ele1 = document.getElementById("bbar" + j);
            let ele2 = document.getElementById("bbar" + (j + 1));
            changebgcolor(ele1, "yellow");
            changebgcolor(ele2, "yellow");
            let speed = 5000 / document.getElementById("speed1").value;
            await pause("bubble");
            await sleep(speed / 4);
            if (arr[j] > arr[j + 1]) {
                changebgcolor(ele1, "red");
                changebgcolor(ele2, "red");
                await pause("bubble");
                await sleep(speed / 4);
                swap(arr, j, j + 1);
                await swapelement(ele1, ele2, speed,"bubble");

            }
            await pause("bubble");

            changebgcolor(ele1, "aqua");
            changebgcolor(ele2, "aqua");

        }
        await pause("bubble");
        changebgcolor(document.getElementById("bbar" + (n - i - 1)), "azure");
    }
    //first element is not marked yet so mark it green
    changebgcolor(document.getElementById("bbar" + 0), "azure");
    pausebutton.disabled=true;
    event.target.innerHTML="New Input Array";
    event.target.disabled =false;
    EnableAllSortButtonOnStart();
    document.getElementById("result1").innerHTML = "Output Array : " + arr;
    }
    
});
//==============================================================================================================================================================================
//==================================================================================Selection sort==============================================================================
//click on selection sort
document.getElementById("selection").addEventListener("click", (event) => {
    heading(2);
    createbars(event.target, "sbar", 2, "selection");
})
//selection sort
let selectionstart = document.getElementById("selectionstart");
selectionstart.addEventListener('click', async (event) => {
    
    if(event.target.innerHTML==="New Input Array"){
        createbars(document.getElementById("selection"), "sbar", 2, "selection");
    }
    else{
        DisableAllSortButtonOnStart();
        event.target.disabled = true;
        document.getElementById("size2").disabled=true;
        let pausebutton = document.getElementById("selectionpause");
        pausebutton.disabled = false;
    
        let string = document.getElementById("array2").innerHTML.slice(14);
        let arr = JSON.parse("[" + string + "]");
        let n = arr.length;
    
        for (let i = 0; i < n; i++) {
            let speed = 5000 / document.getElementById("speed2").value;
            let min = i;
            let ele1 = document.getElementById("sbar" + i);
            changebgcolor(ele1, "yellow");
            await pause("selection");

            for (let j = i + 1; j < n; j++) {
                
                changebgcolor(document.getElementById("sbar" + j), "yellow");
    
                await pause("selection");
    
                await sleep(speed / 4);
                if (arr[j] < arr[min]) {
                    //if min is at i dont do anything else change the color to aqua
                    if (min !== i) {
                        changebgcolor(document.getElementById("sbar" + j), "yellow");
                        changebgcolor(document.getElementById("sbar" + min), "aqua");
    
                    }
                    min = j;
                }
                else {
                    changebgcolor(document.getElementById("sbar" + j), "aqua");
                }
    
            }
            await pause("selection");
            await sleep(speed / 4);
            if (min != i) {
                changebgcolor(ele1, "red");
                let ele2 = document.getElementById("sbar" + min);
                changebgcolor(ele2, "red");
                swap(arr, i, min);
                speed = 5000 / document.getElementById("speed2").value;
                await swapelement(ele1, ele2, speed,"selection");
                
                //mark element brought to first azure i.e. it is at correct position and other as aqua
                changebgcolor(ele2, "azure");
                changebgcolor(ele1, "aqua");
                await pause("selection");
                await sleep(speed / 4);
            }
            else {
                //means first element is at correct position so mark it azure 
                changebgcolor(ele1, "azure");
    
            }
            await pause("selection");

        }
        pausebutton.disabled=true;
        event.target.innerHTML="New Input Array";
        event.target.disabled =false;
        EnableAllSortButtonOnStart();
        document.getElementById("result2").innerHTML = "Output Array : " + arr;
    }
});
//==============================================================================================================================================================================
//==============================================================================Insertion sort==================================================================================
//click on insertion sort
document.getElementById("insertion").addEventListener("click", (event) => {
    heading(3);
    createbars(event.target, "ibar", 3, "insertion");
})

//insertion sort
let insertionstart = document.getElementById("insertionstart");
insertionstart.addEventListener('click', async (event) => {
    if(event.target.innerHTML==="New Input Array"){
        createbars(document.getElementById("insertion"), "ibar", 3, "insertion")
    }
    else{
        DisableAllSortButtonOnStart();
        document.getElementById("size3").disabled=true;

        event.target.disabled = true;
        let pausebutton = document.getElementById("insertionpause");
        pausebutton.disabled = false;

        let string = document.getElementById("array3").innerHTML.slice(14);
        let arr = JSON.parse("[" + string + "]");
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let speed = 5000 / document.getElementById("speed3").value;

            await pause("insertion");
            let key = arr[i];
            //key element will keep hanging 
            let ele1 = document.getElementById("ibar" + i);
            ele1.style.transform = "translateY(-50px)";


            changebgcolor(ele1, "azure")
            await sleep(speed / 4);

            let j = i - 1;
            while (j >= 0 && arr[j] > key) {

                await pause("insertion");

                let ele2 = document.getElementById("ibar" + j);
                changebgcolor(ele2, "yellow");
                changebgcolor(ele1, "yellow");
                await sleep(speed / 4);
                swapelement(ele1, ele2, speed,"insertion");

                arr[j + 1] = arr[j];
                j = j - 1;
                changebgcolor(ele2, "aqua");
                await sleep(speed / 4);
            }
            changebgcolor(ele1, "aqua");

            await pause("insertion");

            ele1.style.transform = ""
            await sleep(speed / 4);
            arr[j + 1] = key;
        }
        pausebutton.disabled=true;
        event.target.innerHTML="New Input Array";
        event.target.disabled =false;
        EnableAllSortButtonOnStart();

        document.getElementById("result3").innerHTML = "Output Array : " + arr;
    }

});

//==============================================================================================================================================================================
//================================================================================Quick Sort====================================================================================
// click on quick sort button
document.getElementById("quick").addEventListener("click", (event) => {
    heading(4);
    createbars(event.target, "qbar", 4, "quick");

})
//to do
async function partition(arr, left, right) {
    let speed = 5000 / document.getElementById("speed3").value;
    for (let i = left; i <= right; i++) {
        document.getElementById("qbar" + i).style.transform = "translateY(-30px)"
    }
    await sleep(speed / 4);
    let pivotele = document.getElementById("qbar" + right);
    changebgcolor(pivotele, "azure");
    pivotele.style.transform = "translateY(-60px)"
    await sleep(speed / 4);
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        let ele2 = document.getElementById("qbar" + j);
        changebgcolor(ele2, "yellow");
        let ele1 = document.getElementById("qbar" + (i + 1));
        changebgcolor(ele1, "yellow");
        await pause("quick");

        await sleep(speed / 4);
        if (arr[j] <= pivot) {
            i++;
            if (i === j) {
            }
            else {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                changebgcolor(ele1, "red");
                changebgcolor(ele2, "red");
                await sleep(speed / 4);
                swapelement(ele1, ele2, speed,"quick");
                changebgcolor(ele1, "aqua");
                changebgcolor(ele2, "aqua");
                await sleep(speed / 4);
            }
        }
        changebgcolor(ele1, "aqua");
        changebgcolor(ele2, "aqua");
        await sleep(speed / 4);
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    let ele3 = document.getElementById("qbar" + (i + 1));
    ele3.style.transform = "translateY(-60px)"
    await pause("quick");
    await sleep(speed / 4);
    changebgcolor(pivotele, "red");
    changebgcolor(ele3, "red");
    await pause("quick");
    await sleep(speed / 4);
    swapelement(pivotele, ele3, speed,"quick");
    await pause("quick");
    await sleep(speed / 4);
    changebgcolor(pivotele, "aqua");
    changebgcolor(ele3, "aqua");
    for (let i = left; i <= right; i++) {
        document.getElementById("qbar" + i).style.transform = ""
    }
    await sleep(speed / 4);
    return i + 1;
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}
//click on quick start button
document.getElementById("quickstart").addEventListener('click', async (event) => {
    if(event.target.innerHTML==="New Input Array"){
        createbars(document.getElementById("quick"), "qbar", 4, "quick");

    }
    else{

        DisableAllSortButtonOnStart();
        document.getElementById("size4").disabled=true;

        event.target.disabled = true;
        let pausebutton = document.getElementById("quickpause");
        pausebutton.disabled = false;

        let qstring = document.getElementById("array4").innerHTML.slice(14);
        let arr = JSON.parse("[" + qstring + "]");
        let n = arr.length;
        
        let newarr = await quickSort(arr);

        pausebutton.disabled=true;
        event.target.innerHTML="New Input Array";
        event.target.disabled =false;  

        EnableAllSortButtonOnStart();
        document.getElementById("result4").innerHTML = "Output Array : " + newarr;
    }
})
//==============================================================================================================================================================================
//==================================================================================Merge Sort==================================================================================
//click on merge sort button
document.getElementById("merge").addEventListener("click", (event) => {
    heading(5);
    createbars(event.target, "mbar", 5, "merge");
})


async function swapformerge(ele1, ele2, where, speed, side) {
    let left1 = ele1.offsetLeft;
    let left2 = ele2.offsetLeft;
    let parent1 = ele1.parentNode;
    let parent2 = ele2.parentNode;
    let ele1next = ele1.nextSibling;
    let ele2next = ele2.nextSibling;
    let diff = left1 - left2
    let ele1id = ele1.id;
    let ele2id = ele2.id;
    ele1.setAttribute("id", ele2id);
    ele2.setAttribute("id", ele1id);
    if (where === "down") {
        ele1.style.transform = "translate(" + (-diff) + "px,305px)"
        await pause("quick");
        await sleep(speed / 4);
        parent1.removeChild(ele1);
        parent2.removeChild(ele2);
        parent1.insertBefore(ele2, ele1next);
        parent2.insertBefore(ele1, ele2next);
        ele1.style.transform = ""
        ele2.style.transform = ""

    }
    else {
        ele2.style.transform = "translate(" + diff + "px,-305px)"
        await pause("quick");
        await sleep(speed / 4);
        parent1.removeChild(ele1);
        parent2.removeChild(ele2);
        parent1.insertBefore(ele2, ele1next);
        parent2.insertBefore(ele1, ele2next);
        ele1.style.transform = ""
        ele2.style.transform = ""
    }

}

function createleftRightbar(side, i, parent, width) {
    let newbar = document.createElement("div");
    newbar.style.height = "50px";
    newbar.style.width = width;
    newbar.classList.add("bar");
    newbar.style.background = "none";
    newbar.style.border = "none";
    newbar.setAttribute("id", side + "array" + i);
    parent.appendChild(newbar);

}
async function merge(arr, l, m, r) {
    let speed = 5000 / document.getElementById("speed5").value;
    for(let i=l;i<=r;i++){
        document.getElementById("mbar"+i).style.background="azure";
        await sleep(speed / 4);
    }
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    let left = document.getElementById("MergeLeftArray");
    let right = document.getElementById("MergeRightArray");
    let testbox = document.getElementById("test5");
    let width = testbox.firstElementChild.style.width;
    for (var i = 0; i < n1; i++) {
        createleftRightbar("left", i, left, width);
        let ele1 = document.getElementById("mbar" + (l + i));
        let ele2 = document.getElementById("leftarray" + i);
        await swapformerge(ele1, ele2, "down", speed, "left");
        L[i] = arr[l + i];
    }
    for (var j = 0; j < n2; j++) {
        createleftRightbar("right", j, right, width);
        let ele1 = document.getElementById("mbar" + (m + 1 + j));
        let ele2 = document.getElementById("rightarray" + j);
        R[j] = arr[m + 1 + j];
        await swapformerge(ele1, ele2, "down", speed, "right");
    }
    var i = 0;
    var j = 0;
    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            let ele1 = document.getElementById("mbar" + k);
            let ele2 = document.getElementById("leftarray" + i);
            await swapformerge(ele1, ele2, "up", speed, "left");
            arr[k] = L[i];
            i++;
        }
        else {
            let ele1 = document.getElementById("mbar" + k);
            let ele2 = document.getElementById("rightarray" + j);
            await swapformerge(ele1, ele2, "up", speed, "right");
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        let ele1 = document.getElementById("mbar" + k);
        let ele2 = document.getElementById("leftarray" + i);
        await swapformerge(ele1, ele2, "up", speed, "left");
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        let ele1 = document.getElementById("mbar" + k);
        let ele2 = document.getElementById("rightarray" + j);
        await swapformerge(ele1, ele2, "up", speed, "right");
        arr[k] = R[j];
        j++;
        k++;
    }
    clearbars(left);
    clearbars(right);
    for(let i=l;i<=r;i++){
        document.getElementById("mbar"+i).style.background="aqua";
    }
}

async function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    var m = l + parseInt((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}
//click on merge start
document.getElementById("mergestart").addEventListener('click', async (event) => {
    if(event.target.innerHTML==="New Input Array"){
        createbars(document.getElementById("merge"), "mbar", 5, "merge");
    }
    else{
        DisableAllSortButtonOnStart();
        document.getElementById("size5").disabled=true;

        event.target.disabled = true;
        let pausebutton = document.getElementById("mergepause");
        pausebutton.disabled = false;

        let string = document.getElementById("array5").innerHTML.slice(14);
        let arr = JSON.parse("[" + string + "]");
        let n = arr.length;

        let showmerge = document.getElementById("showmergetest");
        showmerge.style.height = 300 + "px";
        showmerge.style.border = "5px solid rgb(191, 191, 191)";
        showmerge.style.borderTop = "0px"

        await mergeSort(arr, 0, n - 1);

        showmerge.style.height = 0 + "px";
        showmerge.style.border = "none";

        pausebutton.disabled=true;
        event.target.innerHTML="New Input Array";
        event.target.disabled =false;  
        EnableAllSortButtonOnStart();

        document.getElementById("result5").innerHTML = "Output Array : " + arr;
    }

})

