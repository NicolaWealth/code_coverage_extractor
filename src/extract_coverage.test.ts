import {extractCoverage} from "./extract_coverage";
import * as fs from "fs";
import assert from "assert";
import sinon from "sinon";

describe("extract coverage tests", () => {
  let consoleLogStub: sinon.SinonStub;
  const outputFile = 'resources/test_badge.json';

  const fileSystemStub = {
    writeFileSync: sinon.stub()
  };

  beforeEach(function() {
    consoleLogStub = sinon.stub();
  });

  afterEach(function() {
    consoleLogStub.reset();
    fileSystemStub.writeFileSync.reset();
  });

  it("less than 50% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/failing_coverage.json', 'utf-8')), outputFile, consoleLogStub, fileSystemStub);

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(0));

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `0%`,
      color: 'red'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fileSystemStub.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("between 50% and 69% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/passing_coverage.json', 'utf-8')), outputFile, consoleLogStub, fileSystemStub);

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(60));

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `60%`,
      color: 'yellow'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fileSystemStub.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("between 70% and 89% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/high_coverage.json', 'utf-8')), outputFile, consoleLogStub, fileSystemStub);

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(80));

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `80%`,
      color: 'yellowgreen'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fileSystemStub.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("greater than 89% coverage", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/full_coverage.json', 'utf-8')), outputFile, consoleLogStub, fileSystemStub);

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(100));

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `100%`,
      color: 'brightgreen'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fileSystemStub.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("no statement map", async () => {
    // Read fake coverage output and update badge data
    extractCoverage(JSON.parse(fs.readFileSync('./resources/no_statementmap.json', 'utf-8')), outputFile, consoleLogStub, fileSystemStub);

    // Assert the console logged coverage value is correct
    assert(consoleLogStub.calledOnce);
    assert(consoleLogStub.calledWith(0));

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `0%`,
      color: 'red'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fileSystemStub.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });
});
