const { spawn } = require('node:child_process');

const npmCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(npmCommand, ['expo', 'start', '--dev-client', '--lan'], {
  env: { ...process.env, APP_VARIANT: 'development' },
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
