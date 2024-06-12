const fs = require('fs').promises;
const path = require('path');

const HOME = async (req, res) => {
    return res.render('index.html', {});
};

// Helper function to read JSON file asynchronously
const readJSONFile = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

// Route controller for regions
const REGIONS = async (req, res) => {
    const regions = await readJSONFile(path.join(__dirname, 'json', 'refregion.json'));
    if (req.query.regCode) {
        console.log(req.query.regCode);
        return res.json(regions["RECORDS"].filter((item) => item.regCode == req.query.regCode));
    } else {
        return res.json(regions["RECORDS"]);
    }
};

// Route controller for provinces
const PROVINCES = async (req, res) => {
    const provinces = await readJSONFile(path.join(__dirname, 'json', 'refprovince.json'));
    if (req.query.regCode) {
        console.log(req.query.regCode);
        return res.json(provinces["RECORDS"].filter((item) => item.regCode == req.query.regCode));
    } else if (req.query.provCode) {
        console.log(req.query.provCode);
        return res.json(provinces["RECORDS"].filter((item) => item.provCode == req.query.provCode));
    } else {
        return res.json(provinces["RECORDS"]);
    }
};

// Route controller for citymuns
const CITYMUNS = async (req, res) => {
    const citymuns = await readJSONFile(path.join(__dirname, 'json', 'refcitymun.json'));
    if (req.query.provCode && req.query.regCode) {
        console.log(req.query.regCode, " : ", req.query.provCode);
        return res.json(citymuns["RECORDS"].filter((item) => item.regDesc == req.query.regCode && item.provCode == req.query.provCode));
    }
    if (req.query.regCode) {
        console.log(req.query.regCode);
        return res.json(citymuns["RECORDS"].filter((item) => item.regCode == req.query.regCode));
    } else if (req.query.provCode) {
        console.log(req.query.provCode);
        return res.json(citymuns["RECORDS"].filter((item) => item.provCode == req.query.provCode));
    } else {
        return res.json(citymuns["RECORDS"]);
    }
};

// Route controller for barangays
const BARANGAYS = async (req, res) => {
    const barangays = await readJSONFile(path.join(__dirname, 'json', 'refbrgy.json'));
    if (req.query.provCode && req.query.citymunCode) {
        console.log(req.query.citymunCode, " : ", req.query.provCode);
        return res.json(barangays["RECORDS"].filter((item) => item.citymunCode == req.query.citymunCode && item.provCode == req.query.provCode));
    }
    if (req.query.regCode) {
        console.log(req.query.regCode);
        return res.json(barangays["RECORDS"].filter((item) => item.regCode == req.query.regCode));
    } else if (req.query.provCode) {
        console.log(req.query.provCode);
        return res.json(barangays["RECORDS"].filter((item) => item.provCode == req.query.provCode));
    } else if (req.query.citymunCode) {
        console.log(req.query.citymunCode);
        return res.json(barangays["RECORDS"].filter((item) => item.citymunCode == req.query.citymunCode));
    } else {
        return res.json(barangays["RECORDS"]);
    }
};

// Export route controllers
module.exports.HOME = HOME;
module.exports.REGIONS = REGIONS;
module.exports.PROVINCES = PROVINCES;
module.exports.CITYMUNS = CITYMUNS;
module.exports.BARANGAYS = BARANGAYS;
