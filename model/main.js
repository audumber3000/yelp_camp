



$(document).ready(function () {

	var ctx1 = $("#pie-chartcanvas-1");
	var ctx2 = $("#pie-chartcanvas-2");

	var data1 = {
		labels : ["match1", "match2"],
		datasets : [
			{
				label : "TeamA score",
				data : [100, 50],
				backgroundColor : [
                    "#DEB887",
                    "#A9A9A9"
                    
                ],
                borderColor : [
                    "#CDA776",
                    "#989898"
                    
                ],
                borderWidth : [1, 1]
			}
		]
	};

	var data2 = {
		labels : ["match1", "match2"],
		datasets : [
			{
				label : "TeamB score",
				data : [20, 35],
				backgroundColor : [
                    "#FAEBD7",
                    "#DCDCDC"
                   
                ],
                borderColor : [
                    "#E9DAC6",
                    "#CBCBCB"
                    
                ],
                borderWidth : [1, 1]
			}
		]
	};

	var options = {
		title : {
			display : true,
			position : "top",
			text : "Pie Chart",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : true,
			position : "bottom"
		}
	};


	var chart1 = new Chart( ctx1, {
		type : "pie",
		data : data1,
		options : options
	});

	var chart2 = new Chart( ctx2, {
		type : "pie",
		data : data2,
		options : options
	});

});

