require("dotenv").config()
const express = require('express');
const cors = require('cors');



const app = express();
app.use(cors());

app.get('/', (req, res) => {
	return res.send('Hello World!');
});

app.use("/ph/regions", (req, res) => {
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refregion.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else {
		return res.json(require("./json/refregion.json")["RECORDS"]);
	}
})

app.use("/ph/provinces", (req, res) => {
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refprovince.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else if (req.query.provCode) {
		console.log(req.query.provCode);
		return res.json(require("./json/refprovince.json")["RECORDS"].filter((item) => item.provCode == req.query.provCode));
	} else {
		return res.json(require("./json/refprovince.json")["RECORDS"]);
	}
})


app.use("/ph/citymun", (req, res) => {
	if (req.query.provCode && req.query.regCode) {
		console.log(req.query.regCode, " : ", req.query.provCode);
		return res.json(require("./json/refcitymun.json")["RECORDS"].filter((item) => item.regDesc == req.query.regCode && item.provCode == req.query.provCode));
	}

	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refcitymun.json")["RECORDS"].filter((item) => item.regDesc == req.query.regCode));
	} else if (req.query.provCode) {
		console.log(req.query.provCode);
		return res.json(require("./json/refcitymun.json")["RECORDS"].filter((item) => item.provCode == req.query.provCode));
	} else {
		return res.json(require("./json/refcitymun.json")["RECORDS"]);
	}
})
app.use("/ph/barangays", (req, res) => {
	if (req.query.provCode && req.query.citymunCode) {
		console.log(req.query.citymunCode, " : ", req.query.provCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.citymunCode == req.query.citymunCode && item.provCode == req.query.provCode));
	}
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else if (req.query.provCode) {
		console.log(req.query.provCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.provCode == req.query.provCode));
	} else if (req.query.citymunCode) {
		console.log(req.query.citymunCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.citymunCode == req.query.citymunCode));
	}
	else {
		return res.json(require("./json/refbrgy.json")["RECORDS"]);
	}

})


app.listen(process.env.PORT, () => {
	console.log("Server is running on port 3000");
})