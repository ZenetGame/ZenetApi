import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);


function extractOutputs(content) {

    var regexPattern = /[^A-Za-z0-9{}:,._]/g;
    var content2 = content.replace(regexPattern, "");
    console.log("REGEX_1",content2);
    console.log("==============================");


    var regexPattern2 = /(^(.)*(timennOutputsnn)(LeoExecutedzenet)(.)*$)/g;
    var content3 = content2.replace(regexPattern2, "");

    var regexPattern2 = /((LeoExecutedzenet)(.)*$)/g;
    var content4 = content3.replace(regexPattern2, "");
    var regexPattern2 = /(^(.)*(timeOutputs))/g;
    var content5 = content4.replace(regexPattern2, "");
    console.log("==============================");
    var content6 = content5.replace("}{","},{");
    console.log("content5",content6);
    var obj = eval(content6);

    var cantbelievethisisjson = JSON.parse(obj);

    console.log("cantbelievethisisjson",cantbelievethisisjson);

    var regexPattern2 = /[/\LeoExecutedzenetaleo\b/.$]/g;
    
    var content4 = content2.replace(regexPattern2, "");
    //console.log("newtext",content4);

    

    
}





export default async (req, res) => {
  const { command, params } = req.query;

//   PLAYER1_PRIVATE_KEY
//   PLAYER1_VIEW_KEY
//   PLAYER1_ADDRESS





  try {
    //const { stdout, stderr } = await execAsync(`cd `+process.env.ZENET_PATH+` && leo run ${command} `+process.env.PLAYER2_ADDRESS);


    const content = `{"output":"Leo Compiled 'main.leo' into Aleo instructions\n       Leo ✅ Built 'zenet.aleo' (in \"/Users/alpguneysel/Desktop/_hackathon/_ZKHACKATHON/ZenetAleo/build\")\n\n\n⛓  Constraints\n\n •  'zenet.aleo/new' - 6,060 constraints (called 1 time)\n\n➡️  Outputs\n\n • {\n  owner: aleo1qttvkxx3expu6ueqlwrydt7v0xjpqzmayeqsqlyha8d74u6q5srqfun7cj.private,\n  gates: 0u64.private,\n  cell_state: 1023u32.private,\n  cell_occ: 682u32.private,\n  p1: aleo1qttvkxx3expu6ueqlwrydt7v0xjpqzmayeqsqlyha8d74u6q5srqfun7cj.private,\n  p2: aleo172xc22y5jfzun0ezw7yfc55203sy6ufdvcugysqdw2ajpw86uc9q57enk3.private,\n  _nonce: 907162834204410688894789381448021493709333855575457203863200969507240601727group.public\n}\n • {\n  owner: aleo1qttvkxx3expu6ueqlwrydt7v0xjpqzmayeqsqlyha8d74u6q5srqfun7cj.private,\n  gates: 0u64.private,\n  positions: 0u32.private,\n  _nonce: 5594601622076519647297953564996072245652652702590643983137458613799741604386group.public\n}\n • {\n  owner: aleo172xc22y5jfzun0ezw7yfc55203sy6ufdvcugysqdw2ajpw86uc9q57enk3.private,\n  gates: 0u64.private,\n  positions: 0u32.private,\n  _nonce: 621447418956312984024088990846419037835211540044314337100189916927232040810group.public\n}\n\n       Leo ✅ Executed 'zenet.aleo/new' (in \"/Users/alpguneysel/Desktop/_hackathon/_ZKHACKATHON/ZenetAleo/build\")"}`;



    res.status(200).json({ output: extractOutputs(content) });
  } catch (error) {
    res.status(500).json({ error: `Error executing the script: ${error.message}` });
  }
};