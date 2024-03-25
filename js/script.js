
var arrayOfList = Array();


//  Drag tags

var remove = document.querySelector('.draggable');

function dragStart(e) {
this.style.opacity = '0.4';
dragSrcEl = this;
e.dataTransfer.effectAllowed = 'move';
e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
this.classList.add('over');
}

function dragLeave(e) {
e.stopPropagation();
this.classList.remove('over');
}

function dragOver(e) {
e.preventDefault();
e.dataTransfer.dropEffect = 'move';
return false;
}

function dragDrop(e) {

const ul = this.parentNode;
console.log(arrayOfList);
if (dragSrcEl != this) {
let dragIndex = Array.from(ul.children).indexOf(dragSrcEl);
let dropIndex = Array.from(ul.children).indexOf(this);

// Reorder the tags array
[arrayOfList[dragIndex], arrayOfList[dropIndex]] = [arrayOfList[dropIndex], arrayOfList[dragIndex]];

dragSrcEl.innerHTML = this.innerHTML;



this.innerHTML = e.dataTransfer.getData('text/html');

}
return false;
}

function dragEnd(event, arrayOfList) {
var listItens = document.querySelectorAll('.draggable');
arrayOfList.forEach.call(listItens, function(item) {
});
console.log(arrayOfList);
event.target.style.opacity = '1';

var DOMSimpleTags = document.querySelectorAll('.simple-tags');
DOMSimpleTags = Array.from(DOMSimpleTags);
DOMSimpleTags.forEach(function (currentValue, index) {

// create Tags
new Tags(currentValue);
});


}
function addEventsDragAndDrop(el, dragStart, dragEnter, dragOver, dragLeave, dragDrop, dragEnd, arrayOfList, DOMList) {
el.addEventListener('dragstart', dragStart, false);
el.addEventListener('dragenter', dragEnter, false);
el.addEventListener('dragover', dragOver, false);
el.addEventListener('dragleave', dragLeave, false);
el.addEventListener('drop', dragDrop, false);

el.addEventListener('dragend', function() {
dragEnd(event, arrayOfList);
}, false);

}



function Tags(element) {
var DOMParent = element;
console.log(element);
var DOMList;
var DOMInput;
var dataAttribute;

function DOMCreate() {
var ul = document.createElement('ul');
var li = document.createElement('li');
DOMParent.appendChild(ul);

DOMList = DOMParent.firstElementChild; 

DOMInput = document.getElementById('input');
console.log(DOMInput);
}

function DOMRender() {
DOMList.innerHTML = ''; 

arrayOfList.forEach(function (currentValue, index) {
var li = document.createElement('li');
li.className = 'draggable tag__name';
li.setAttribute('draggable', true);

li.innerHTML = "".concat(currentValue, " <a>&times;</a>");
li.querySelector('a').addEventListener('click', () => onDelete(index));

DOMList.appendChild(li);
setAttribute();
});

var listItens = document.querySelectorAll('.draggable');
arrayOfList.forEach.call(listItens, function(item) {
addEventsDragAndDrop(item, dragStart, dragEnter, dragOver, dragLeave, dragDrop, dragEnd, arrayOfList, DOMList);
});
}

function onKeyUp(e) {

if(e.key == "Enter"){
e.preventDefault(); 
let inpttag = e.target.value.replace(/\s+/g, ' ');
if(inpttag.length > 1 && !arrayOfList.includes(inpttag)){
inpttag.split('||').forEach(inptag => {
arrayOfList.push(inptag);
DOMRender();
});
}
e.target.value = "";
}
}
function onDelete(id) {
arrayOfList = arrayOfList.filter(function (currentValue, index) {
if (index == id) {
return false;
}
return currentValue;
});
DOMRender();
}

function getAttribute() {
if (arrayOfList.length==0) {

dataAttribute = DOMParent.getAttribute('data-simple-tags');
dataAttribute = dataAttribute.split(','); 

arrayOfList = dataAttribute.map(function (currentValue) {
return currentValue.trim();
});
}
}

function setAttribute() {
DOMParent.setAttribute('data-simple-tags', arrayOfList.toString());
}

getAttribute();
DOMCreate();
DOMRender();
DOMInput.addEventListener("keydown", onKeyUp);
} 


(function () {
var DOMSimpleTags = document.querySelectorAll('.simple-tags');
DOMSimpleTags = Array.from(DOMSimpleTags);
DOMSimpleTags.forEach(function (currentValue, index) {
// create Tags
new Tags(currentValue);
});


})();

