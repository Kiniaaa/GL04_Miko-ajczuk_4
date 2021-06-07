function statistic(freqs, treeObj, length) {
	let resultTable = [];
	const codes = [];
	//zamiana znaków specjalnych
	for (let char in freqs) {
		let bitString = findChar(char, treeObj);
		let charAlias = char;
		switch(char) {
			case "\n": charAlias = "<span class='aliasedChar'>\\n</span>"; break;
			case "\t": charAlias = "<span class='aliasedChar'>\\t</span>"; break;
			case " ": charAlias = "<span class='aliasedChar'>spacja</span>"; break;
		}
		resultTable.push( {"char":charAlias, "freq":freqs[char], "bitString":bitString} );
	}
	const probabilities = [];
	for (let i = 0; i < resultTable.length; i++) {
		probabilities[i] = [];
	}
	//posortowanie danych w tabeli
	resultTable.sort(function(a,b) {
		let freqComp = b["freq"] - a["freq"];
		if (freqComp != 0) {
			return freqComp;
		}
		let lenComp = a["bitString"].length - b["bitString"].length;
		if (lenComp != 0) {
			return lenComp;
		}
		
		return a["charAlias"] < b["charAlias"];
	});
	
	//zbudoawnie tabeli
	let result = "<table><tr><th>Znak</th><th>Prawdopodobieństwo wystąpienia</th><th>Kod</th></tr>";
	for (let i=0; i<resultTable.length; i++) {
		let current = resultTable[i];
		probabilities[i][0] = current["char"];
		probabilities[i][1] = current["freq"]/length;
		codes[i] = current["bitString"];
		result += "<tr><td>"+probabilities[i][0]+"</td><td>"+probabilities[i][1]+"</td><td>"+codes[i]+"</td></tr>";
	}
	result += "</table>";

	result += "<div class='stats'><h3 class='entropy'> Wartość entropii: " + getEntropy(probabilities) + "</h3>";
	result += "<h3 class='avg'> Średnia długość słowa kodowego: " + getAvg(probabilities, codes) + "</h3></div>";

	return result;
}

//obliczenie entropii
function getEntropy (probabilities)
{
	if (!probabilities)
		return null;
	let entropy = 0;
	for (let i = 0; i < probabilities.length; i++) {
		entropy += probabilities[i][1] * Math.log2(1 / probabilities[i][1]);
	}
	return entropy.toFixed(5);
}

//obliczenie średniej długości słowa kodowego
getAvg = (probabilities, codes) => {
	if (!probabilities || !codes)
		return null;
	let sum = 0;
	for (let i in probabilities) {
		const sign = probabilities[i][0];
		const prob = probabilities[i][1];
		sum += prob * codes[i].length;
	}
	return sum.toFixed(5);
}