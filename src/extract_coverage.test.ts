import {extractCoverage} from "./extract_coverage";
import * as fs from "fs";
import assert from "assert";
import sinon from "sinon";

describe("extract coverage tests", () => {
  let consoleLogStub: sinon.SinonStub;
  let badgeData = JSON.parse(fs.readFileSync('./resources/test_badge.json', 'utf-8'));
  const outputFile = 'resources/test_badge.json';

  beforeEach(function() {
    consoleLogStub = sinon.stub(console, 'log');
  });

  afterEach(function() {
    consoleLogStub.restore();
  });

  it("less than 50% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/failing_coverage.json', 'utf-8')), outputFile);
    badgeData = JSON.parse(fs.readFileSync('./resources/test_badge.json', 'utf-8'));

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(0));

    // Assert the badge data was updated appropriately
    assert.strictEqual(badgeData.message, '0%');
    assert.strictEqual(badgeData.color, 'red');
  });

  it("between 50% and 69% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/passing_coverage.json', 'utf-8')), outputFile);
    badgeData = JSON.parse(fs.readFileSync('./resources/test_badge.json', 'utf-8'));

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(60));

    // Assert the badge data was updated appropriately
    assert.strictEqual(badgeData.message, '60%');
    assert.strictEqual(badgeData.color, 'yellow');
  });

  it("between 70% and 89% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/high_coverage.json', 'utf-8')), outputFile);
    badgeData = JSON.parse(fs.readFileSync('./resources/test_badge.json', 'utf-8'));

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(80));

    // Assert the badge data was updated appropriately
    assert.strictEqual(badgeData.message, '80%');
    assert.strictEqual(badgeData.color, 'yellowgreen');
  });

  it("greater than 89% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/full_coverage.json', 'utf-8')), outputFile);
    badgeData = JSON.parse(fs.readFileSync('./resources/test_badge.json', 'utf-8'));

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(100));

    // Assert the badge data was updated appropriately
    assert.strictEqual(badgeData.message, '100%');
    assert.strictEqual(badgeData.color, 'brightgreen');
  });

  it("no statement map", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/no_statementmap.json', 'utf-8')), outputFile);
    badgeData = JSON.parse(fs.readFileSync('./resources/test_badge.json', 'utf-8'));

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(0));

    // Assert the badge data was updated appropriately
    assert.strictEqual(badgeData.message, '0%');
    assert.strictEqual(badgeData.color, 'red');
  });
});
