//obliczenie częstości występowania znaków
function getFrequency(text) {
	let freqs = {};
	for (let i=0; i<text.length; i++) {
		let char = text.charAt(i);
		if (!(char in freqs)) {
			freqs[char] = 1;
		}
		else {
			freqs[char] += 1;
		}
	}
	return freqs;
}

//budowanie kolejki
function buildPriorityQueue(freqs) {
	heapReset();										//wyczyszczenie stosu
	let trees = {}
	for (let char in freqs) {
		heapAdd({"value":char, "freq":freqs[char]});	//dodanie elementu na stos
		trees[char] = {"freq":freqs[char], "left":null, "right":null};
	}
	return trees;
}

//zbudowanie drzewa Huffmana
function buildHuffmanTree(trees) {
	while (heapLength() >= 2) {
		let heapEntry1 = heapGet(); 	//pobranie stosu
		let heapEntry2 = heapGet();		//pobranie stosu
		
		let combinedFreq = heapEntry1["freq"] + heapEntry2["freq"];
		let combinedName = heapEntry1["value"] + heapEntry2["value"];
		
		trees[combinedName] = {"freq":combinedFreq, "left":heapEntry1["value"], "right":heapEntry2["value"]};
		heapAdd({"value":combinedName, "freq":combinedFreq});
	}	
	const lastItem = heapGet();
	return {"root":lastItem["value"], "fullTree":trees};
}

//wyświetlenie zakodowanego tekstu i znaczenie kolorami kolejnych znaków
function normalEncodeFormatted(input) {
	let result = "";
	let colorIdx = 0;
	const colors = ["#FFF8DC", "#B0E0E6"];
	for (let i=0; i<input.length; i++) {
		let charCode = input.charCodeAt(i);
		result += "<span style='background-color:" + colors[colorIdx] + "'> " + resolveChar(charCode) + " </span>";
		colorIdx = (colorIdx+1) % 2;
	}
	return result;
}

//wyświetlenie tekstu zakodowanego Huffmanem i znaczenie kolorami kolejnych znaków
function encodeFormatted(treeObj, input) {
	let result = "";
	let colorIdx = 0;
	const colors = ["#FFF8DC", "#B0E0E6"];
	for (let i=0; i<input.length; i++) {
		let char = input.charAt(i);
		result += "<span style='background-color:" + colors[colorIdx] + "'> " + findChar(char, treeObj) + " </span>";
		colorIdx = (colorIdx+1) % 2;
	}
	return result;
}

//metoda pomocnicza do znajdowania kodu znaku zakodowanego Huffmanem
function findChar(ch, treeObj) {
	let result = "";
	let pos = treeObj["root"];
	while (true) {
		if (pos == ch && result == "") { //gdy drzewo ma jeden symbol
			return "0";
		}
		if (pos == ch) {
			break;
		}
		var curr = treeObj["fullTree"][pos];
		if (curr["left"] != null && curr["left"].includes(ch)) {
			pos = curr["left"];
			result += "0";
		}
		else if (curr["right"] != null && curr["right"].includes(ch)) {
			pos = curr["right"];
			result += "1";
		}
		else {
			console.log("Coś poszło nie tak: ");
			if (curr["left"] != null) {
				console.log("\t" + curr["left"]);
			}
			if (curr["right"] != null) {
				console.log("\t" + curr["right"]);
			}
			break;
		}
	}
	return result;
}


//metoda pomocnicza do znajdowania kodu znaku
function resolveChar(code) {
	let output = "";
	for (let i=0; i<8; i++) {
		let mask = 1 << i;
		if (code & mask) {
			output += "1";
		}
		else {
			output += "0";
		}
	}
	return output;
}