![Tests Passing](https://github.com/NicolaWealth/code_coverage_extractor/actions/workflows/auto_test_main_badge.yml/badge.svg)

# Introduction
The `Code Coverage Extractor` provides functionality to extract statement coverage for a given file(s) and output the data in a `Shields.io` dyanmic endpoint badge format. 

# Installation
This package should be installed via npm. You must have npm installed first. The following can be run on the commandline to install the `Code Coverage Extractor` package with npm:

`npm install @nicolawealth/code_coverage_extractor`

# Usage
This package can be used in combination with `Shields.io` (or other badge generation tools) and GitHub actions workflows to provide a dynamic badge conveying up-to-date code coverage information on a GitHub or NPM `readme` file. Additional use cases exist for local statement coverage requirements.

# Setup & Configurations
Before the package can be used, you must have `mocha`and `nyc` setup and configured such that a `coverage-final.json` file is outputted in your coverage reporting script.

* `package.json` coverage reporting script example: `"cover:report": "nyc --reporter=text --reporter=json mocha -c"`

# Interface
The package provides the function `extractCoverage(coverageData, outputFile)` which consumes a `coverageData` file in a `.json` format (`coverage-final.json`) and an output file path which must also be a `.json` file. The package will compute statement coverage and output the resulting badge data, formatted to a `Shields.io` endpoint badge format as follows:

```
{
  "label": "Coverage",
  "message": "_%",
  "color": "(red, yellow, yellowgreen, green)"
}
```

where the `_` is replaced by the actual coverage value and the color changes to dynamically reflect the coverage value (red, yellow, yellowgreen, green).


# Testing
Tests can be found in `extract_coverage.test.ts` located in `code_coverage_extractor/src` and should be run with sinon, mocha and nyc.
