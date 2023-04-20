import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async (req, res) => {
  const { command, params } = req.query;



  try {
    const { stdout, stderr } = await execAsync(`leo run ${command}`);

    if (stderr) {
      res.status(500).json({ error: `Error executing the script: ${stderr}` });
      return;
    }

    res.status(200).json({ output: stdout.trim() });
  } catch (error) {
    res.status(500).json({ error: `Error executing the script: ${error.message}` });
  }
};