window.onload = function() {
	const encodeBtn = document.getElementById("encodeBtn");
	encodeBtn.onclick = function() {
		const inputString = document.getElementById("inputField").value;
	
		const freq = getFrequency(inputString);		//obliczenie częstości występowania znaków
		const trees = buildPriorityQueue(freq);		//budowanie kolejki
		const treeObj = buildHuffmanTree(trees);	//zbudowanie drzewa Huffmana

		//wyświetlenie statystyk
		let result = "<h2>Statystyki</h2>";
		result += "<div id='freqDiv'>" + statistic(freq, treeObj, inputString.length) + "</div>";
		
		//wyświetlenie zakodowanego tekstu
		result += "<h3>Tekst zakodowany</h3>";
		result += "<div id='normEncDiv'>" + normalEncodeFormatted(inputString) + "</div>";
		
		//wyświetlenie tekstu po zakodowaniu metodą Huffmana
		result += "<h3>Kod Huffmana</h3>";
		result += "<div id='huffEncDiv'>" + encodeFormatted(treeObj, inputString) + "</div>";
		
		document.getElementById("result").innerHTML = result;		
	}
};