$(document).ready(function() {
	$("#face").hover(function() {
		$(".material-icons").text("sentiment_satisfied");
		setTimeout(function() {
			$(".material-icons").text("sentiment_neutral");
		}, 1000);
	});

	$("#face").click(function() {
		calculate += Math.floor(Math.random() * 10);
		$("#screen").text(calculate);
		$(".material-icons").text("sentiment_very_satisfied");
		setTimeout(function() {
			$(".material-icons").text("sentiment_neutral");
		}, 1000);
	});

	var calculate = "2+2";

	String.prototype.replaceThis = function(original, index, replacement) {
		return (
			this.substr(0, index) + replacement + this.substr(index + original[0].length)
		);
	};

	// Do the operations
	function numbify(x) {
		var n1 = Number(x[1]);
		var op = x[2];
		var n2 = Number(x[3]);

		if (op === "/") return n1 / n2;
		if (op === "*") return n1 * n2;
		if (op === "-") return n1 - n2;
		if (op === "+") return n1 + n2;
	}

	function calc(calculate) {
		// Regular Expressions: Divide and Multiply, Subtract and Add, and their groupings.
		var dm = /\d+[/*]\d+/;
		var dmg = /(\d+)([/*])(\d+)/;
		var sa = /\d+[\-+]\d+/;
		var sag = /(\d+)([\-+])(\d+)/;

		// First Multiply and Divide
		while (Boolean(calculate.match(dm))) {
			calculate = calculate.replaceThis(
				calculate.match(dm),
				calculate.indexOf(calculate.match(dm)),
				numbify(calculate.match(dmg))
			);
		}

		// Second Subtract and Multiply
		while (Boolean(calculate.match(sa))) {
			calculate = calculate.replaceThis(
				calculate.match(sa),
				calculate.indexOf(calculate.match(sa)),
				numbify(calculate.match(sag))
			);
		}
		return calculate;
	}

	$("#screen").text(calculate);

	$(".btn-primary").click(function(x) {
                var isZero = null;

                if (calculate[2]) isZero = calculate.match(/\D0/)
		if ((calculate == 0) || isZero) calculate = calculate.substr(0,calculate.length - 1) + this.value;
		else calculate += this.value;
		$("#screen").text(calculate);
	});
	$(".btn-info").click(function(x) {
		if (calculate.match(/[/*\-+]$/) === null) {
			calculate += this.value;
			$("#screen").text(calculate);
		}
	});
	$(".btn-danger").click(function(x) {
		calculate = "0";
		$("#screen").text(calculate);
	});
	$(".btn-success").click(function(x) {
		calculate = calc(calculate);
		$("#screen").text(calculate);
	});
});