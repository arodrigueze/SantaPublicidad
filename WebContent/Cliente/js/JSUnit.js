/************************
* JSUnit.js
* by Steven Puerto stevenn2012.github.io
************************/

var validationTest = {
	result : true,
	CreateTest: function(title, res, expected) {
		console.log("JSUnit.js: reslt: "+(res==expected)+" for "+title+", result: "+res+", expected:"+expected);
		if(res!=expected) this.result = false;
	},
	resultTests: function () {
		console.log("JSUnit.js: Starting tests");
		testValidations();
		console.log("JSUnit.js: result of validations was: "+this.result);
	}
}

function testValidations() {
	//notBlakSpaceValidation
	validationTest.CreateTest("notBlakSpaceValidation: ['']: ",notBlakSpaceValidation(''),false);
	validationTest.CreateTest("notBlakSpaceValidation: ['     ']: ",notBlakSpaceValidation('     '),false);
	validationTest.CreateTest("notBlakSpaceValidation: ['1']: ",notBlakSpaceValidation('1'),true);
	validationTest.CreateTest("notBlakSpaceValidation: ['abc']: ",notBlakSpaceValidation('abc'),true);
	validationTest.CreateTest("notBlakSpaceValidation: ['/t']: ",notBlakSpaceValidation('\t'),false);
	validationTest.CreateTest("notBlakSpaceValidation: ['/n']: ",notBlakSpaceValidation('\n'),false);
	validationTest.CreateTest("notBlakSpaceValidation: [true]: ",notBlakSpaceValidation(true),true);
	validationTest.CreateTest("notBlakSpaceValidation: [1]: ",notBlakSpaceValidation(1),true);
	validationTest.CreateTest("notBlakSpaceValidation: [1.5]: ",notBlakSpaceValidation(1.5),true);
	validationTest.CreateTest("notBlakSpaceValidation: [null]: ",notBlakSpaceValidation(null),false);

	//numberValidation
	validationTest.CreateTest("numberValidation: [123, true, true]: ",numberValidation (123, true, true),true);

	//upercase name
	validationTest.CreateTest("changeNameFirstUpperCase: sTEVEN pUERTO",changeNameFirstUpperCase('steven puerto'),'Steven Puerto');	
}

//validationTest.resultTests();
