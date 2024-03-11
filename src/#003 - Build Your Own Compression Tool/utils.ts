import fs from 'fs';

function readFile(filename: string): string {
    if(fs.existsSync(filename)) {
        return fs.readFileSync(filename).toString();
    }
    console.error("Input file doesn't exist");
    process.exit(1);
}
