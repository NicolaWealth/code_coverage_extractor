import {extractCoverage} from "./extract_coverage";
import * as fs from "fs";
import assert from "assert";
import sinon from "sinon";

describe("extract coverage tests", () => {
  const outputFile = 'resources/test_badge.json';

  // Create a stub to override the writeFileSync function of a fileSystem
  const writeFileSync: sinon.SinonStub = sinon.stub();

  // Create a proxy which can override the specific function fileSystem when it's called
  const fsProxy = new Proxy(fs as { [key: string]: any; [key: symbol]: any }, {
    get(target, prop) {
      if (prop === 'writeFileSync') {
        return writeFileSync;
      }
      return target[prop];
    }
  });

  afterEach(function() {
    fsProxy.writeFileSync.reset();
  });

  it("less than 50% coverage", async () => {
    // Read fake coverage output, update badge data and ensure returned value is correct
    assert.strictEqual(extractCoverage(JSON.parse(fs.readFileSync('./resources/failing_coverage.json', 'utf-8')), outputFile, fsProxy as typeof fs), 0);

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `0%`,
      color: 'red'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fsProxy.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("between 50% and 69% coverage", async () => {
    // Read fake coverage output, update badge data and ensure returned value is correct
    assert.strictEqual(extractCoverage(JSON.parse(fs.readFileSync('./resources/passing_coverage.json', 'utf-8')), outputFile, fsProxy as typeof fs),60);

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `60%`,
      color: 'yellow'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fsProxy.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("between 70% and 89% coverage", async () => {
    // Read fake coverage output, update badge data and ensure returned value is correct
    assert.strictEqual(extractCoverage(JSON.parse(fs.readFileSync('./resources/high_coverage.json', 'utf-8')), outputFile, fsProxy as typeof fs), 80);

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `80%`,
      color: 'yellowgreen'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fsProxy.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("greater than 89% coverage", async () => {
    // Read fake coverage output, update badge data and ensure returned value is correct
    assert.strictEqual(extractCoverage(JSON.parse(fs.readFileSync('./resources/full_coverage.json', 'utf-8')), outputFile, fsProxy as typeof fs), 100);

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `100%`,
      color: 'brightgreen'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fsProxy.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });

  it("no statement map", async () => {
    // Read fake coverage output, update badge data and ensure returned value is correct
    assert.strictEqual(extractCoverage(JSON.parse(fs.readFileSync('./resources/no_statementmap.json', 'utf-8')), outputFile, fsProxy as typeof fs), 0);

    // Expected badge data passed through stub call
    const badgeData = {
      label: 'Coverage',
      message: `0%`,
      color: 'red'
    };

    // Assert expected badge data was passed
    sinon.assert.calledOnceWithExactly(fsProxy.writeFileSync, outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');
  });
});
