var fs = require('fs'),
	util=require('util');

f1=fs.readFileSync(process.argv[2],"utf8");
f2=fs.readFileSync(process.argv[3],"utf8");

// console.log(f1);

function parse(text){
	var lines = text.split(/\n/);
	var rSd = /^  \d+\. S(\d+)/;
	var speciesInOrder = lines.map(function(line){
		return rSd.exec(line);
	}).filter(function(line){
		return !!line;
	}).map(function(species){
		return species[1];
	});

	var rSplit = /^([.*][.* ]+?)\s+(\d[\d.]+)/;
	var splits= lines.map(function(line){
		return rSplit.exec(line);
	}).filter(function (split) {
		return !!split;
	}).map(function (split) {
		return [0,split[1].replace(/ /g,''),split[2]];
	});


	return splits.map(function(split){
		// util.puts(split[1],split[2]);
		return {
			sv: +split[2],
			dots: speciesInOrder.filter(function(species, index){
				return split[1][index] == '.';
			}).sort(),
			stars: speciesInOrder.filter(function(species, index){
				return split[1][index] == '*';
			}).sort()
		};
	});
}


p1 = parse(f1);
p2 = parse(f2);

// console.log(p1);
// console.log(p2);

function setEqual(a,b){
	if( a.length != b.length) return false;
	return a.every(function(val,index){
		return val == b[index];
	});
}

var intersection = [];

for(var xx in p1){
	var split = p1[xx];
	for(var yy in p2){
		var split2 = p2[yy];
		if( setEqual(split.stars,split2.stars) || setEqual(split.dots,split2.stars)){
			// if(split.stars.length==0){
			// 	util.puts(split.dots);
			// }
			intersection.push([+split.sv/100, +split2.sv/100 , 
				split.stars.length, split2.stars.length ,
				split.dots.length ,split2.dots.length]);
		}
	}
}

intersection.forEach(function(inter){
	util.puts(inter[0] + " " +inter[1]);
});


// var avgX = 0, avgY =0;

// intersection.forEach(function(entry){
// 	avgX += entry[0];
// 	avgY += entry[1];
// });


// avgX /= intersection.length;
// avgY /= intersection.length;

// var num = 0, foo = 0, bar = 0;
// for( var i=0; i< intersection.length;i++){
// 	var point = intersection[i];
// 	num += (point[0] - avgX) * (point[1] - avgY);
// 	foo += (point[0] - avgX) * (point[0] - avgX);
// 	bar += (point[1] - avgY) * (point[1] - avgY);
// }

// util.puts("correlation: "+ num/Math.sqrt(foo*bar));
