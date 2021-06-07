//metody słuzące do zarządzania stosem
let heap = [false]

//wyzerowanie stosu
function heapReset() {
	heap = [false];
}

//dodanie elementu na stos
function heapAdd(item) {
	heap.push(item);
	siftUp(heap.length-1);
}

//pobranie elementu ze stosu
function heapGet() {
	if (heap.length == 1) {
		return false;
	}
	if (heap.length == 2) {
		var result = heap[1];
		heap = [false];
		return result;
	}
	
	var result = heap[1];
	heap[1] = heap.pop();
	siftDown(1);
	return result;
}

//długość stosu
function heapLength() {
	return heap.length - 1;
}

//uporządkowanie stosu
function siftUp(idx) {
	while (true) {
		if (getParent(idx) == -1) break;
		let parentIdx = getParent(idx);
		if (heap[idx]["freq"] < heap[parentIdx]["freq"]) {
			swap(idx, parentIdx);
			idx = parentIdx;
		}
		else {
			break;
		}
	}
}

//uporządkowanie stosu
function siftDown(idx) {
	while (true) {
		let curr = heap[idx];
		let leftIdx = getLeftChild(idx);
		let rightIdx = getRightChild(idx);
		let leftObj = leftIdx==-1? null : heap[leftIdx];
		let rightObj = rightIdx==-1? null : heap[rightIdx];
		
		if (leftIdx == -1 && rightIdx == -1) {
			break;
		}
		else if (rightIdx == -1) {
			if (leftObj["freq"] < curr["freq"]) {
				swap(idx, leftIdx);
				idx = leftIdx;
			}
			else {
				break;
			}
		}
		else if (leftIdx == -1) {
			if (rightObj["freq"] < curr["freq"]) {
				swap(idx, rightIdx);
				idx = rightIdx;
			}
			else {
				break;
			}
		}
		else if (leftObj["freq"] < rightObj["freq"] && leftObj["freq"] < curr["freq"]) {
			swap(idx, leftIdx);
			idx = leftIdx;
		}
		else if (rightObj["freq"] < leftObj["freq"] && rightObj["freq"] < curr["freq"]) {
			swap(idx, rightIdx);
			idx = rightIdx;
		}
		else if (leftObj["freq"] == rightObj["freq"] && leftObj["freq"] < curr["freq"]) {
			swap(idx, leftIdx);
			idx = leftIdx;
		}
		else {
			break;
		}
	}
}

//pobranie odpowiednich elementów stosu
function getParent(idx) { 
	if (idx == 1) return -1;
	return parseInt(idx/2);
}
function getLeftChild(idx) {
	if (2*idx >= heap.length) return -1;
	return 2*idx;
}
function getRightChild(idx) {
	if ((2*idx)+1 >= heap.length) return -1;
	return (2*idx)+1;
}
//zamiana
function swap(idx1, idx2) {
	let temp = heap[idx1];
	heap[idx1] = heap[idx2];
	heap[idx2] = temp;
}