import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);


function extractOutputs(content) {
    const outputsPattern = /➡️\s+Outputs([\s\S]*?)\n{2}/;
    const outputsMatch = content.match(outputsPattern);
  
    if (outputsMatch) {
      const outputBulletPoints = outputsMatch[1];
      const jsonPattern = /{[^]+?}/g;
      const jsonMatches = outputBulletPoints.match(jsonPattern);
  
      if (jsonMatches) {
        const jsonArray = jsonMatches.map(jsonStr => {
          const validJsonStr = jsonStr.replace(/(\w+):/g, '"$1":');
          return JSON.parse(validJsonStr);
        });
  
        return jsonArray;
      } else {
        console.error('No JSON objects found in the Outputs section');
        return null;
      }
    } else {
      console.error('Outputs section not found in the content');
      return null;
    }
}





export default async (req, res) => {
  const { command, params } = req.query;

//   PLAYER1_PRIVATE_KEY
//   PLAYER1_VIEW_KEY
//   PLAYER1_ADDRESS





  try {
    const { stdout, stderr } = await execAsync(`cd `+process.env.ZENET_PATH+` && leo run ${command} `+process.env.PLAYER2_ADDRESS);



    res.status(200).json({ output: extractOutputs(stdout.trim()) });
  } catch (error) {
    res.status(500).json({ error: `Error executing the script: ${error.message}` });
  }
};