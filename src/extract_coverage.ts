import * as fs from "fs";

export const extractCoverage = (coverageData: ReturnType<typeof JSON.parse>, outputFile: fs.PathOrFileDescriptor, fileSystem: typeof fs = fs): number => {
  let totalStatements = 0;
  let coveredStatements = 0;
  let coveragePercentage = 0;

  for (let path in coverageData) {
    const file = coverageData[path];
    const statementMap = file.s;
    if(!statementMap) continue;
    totalStatements += Object.keys(statementMap).length;
    coveredStatements += (Object.values(statementMap) as number[]).filter((value) => value > 0).length;
  }

  if (totalStatements > 0) {
    coveragePercentage = (coveredStatements / totalStatements) * 100;
  }

  const badgeData = {
    label: 'Coverage',
    message: `${coveragePercentage}%`,
    color: coveragePercentage >= 90 ? 'brightgreen' :
      coveragePercentage >= 70 ? 'yellowgreen' :
        coveragePercentage >= 50 ? 'yellow' :
          'red'
  };

  fileSystem.writeFileSync(outputFile, JSON.stringify(badgeData, null, 2), 'utf-8');

  return(coveragePercentage);
}
