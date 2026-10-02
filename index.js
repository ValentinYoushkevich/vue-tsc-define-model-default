const { spawnSync } = require('node:child_process');

const bin = require.resolve('vue-tsc/bin/vue-tsc.js');
const version = require('vue-tsc/package.json').version;

const cases = [
	{
		title: 'A. defineModel<string>({ default: (props) => ... })   src/Parens.vue',
		project: 'tsconfig.parens.json',
		expected: 'no errors',
	},
	{
		title: 'B. defineModel<string>({ default: props => ... })     src/NoParens.vue + src/other.ts',
		project: 'tsconfig.noparens.json',
		expected: 'only the real error in src/other.ts (TS2322)',
	},
];

for (const c of cases) {
	console.log(`\n=== ${c.title}`);
	console.log(`expected: ${c.expected}`);
	const r = spawnSync(process.execPath, [bin, '--noEmit', '-p', c.project, '--pretty', 'false'], { encoding: 'utf8' });
	const out = (r.stdout + r.stderr).trim().split('\n').filter(Boolean);
	console.log(`actual (vue-tsc ${version}):`);
	console.log(out.length ? out.map(l => '  ' + l).join('\n') : '  (no errors)');
}
console.log();
