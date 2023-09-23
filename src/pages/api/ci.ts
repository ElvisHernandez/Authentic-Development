import { api } from "src/blitz-server";
import { exec } from "child_process";
import util from "util";

const execPromisified = util.promisify(exec);

export default api(async (req, res, ctx) => {
  const { secret } = req.body;

  const response: {
    statusCode: number;
    logs: string[];
    errors: string[];
  } = {
    statusCode: 200,
    logs: [],
    errors: [],
  };

  if (secret !== process.env.CI_SECRET) {
    response.statusCode = 401;
    response.errors.push("Invalid Secret");
    return res.status(response.statusCode).json(response);
  }

  try {
    const cwd = "/home/ubuntu/app";

    response.logs.push(
      "---------------------------CD into app directory---------------------------"
    );
    const { stdout: stdout0, stderr: stderror0 } = await execPromisified(`cd /home/ubuntu/app`);
    response.logs.push(stdout0);
    response.errors.push(stderror0);

    response.logs.push(
      "---------------------------Git pull latest changes---------------------------"
    );
    const { stdout: stdout1, stderr: stderror1 } = await execPromisified(
      `GIT_SSH_COMMAND="ssh -i /home/ubuntu/deploy_key.pem" git pull`,
      { cwd }
    );
    response.logs.push(stdout1);
    response.errors.push(stderror1);

    response.logs.push(
      "---------------------------Yarn install latest packages---------------------------"
    );
    const { stdout: stdout2, stderr: stderror2 } = await execPromisified(
      "yarn install --production=false",
      { cwd }
    );
    response.logs.push(stdout2);
    response.errors.push(stderror2);

    response.logs.push(
      "---------------------------Yarn build blitz app---------------------------"
    );
    const { stdout: stdout3, stderr: stderror3 } = await execPromisified("yarn build");
    response.logs.push(stdout3);
    response.errors.push(stderror3);

    response.logs.push(
      "---------------------------Yarn prune dev dependencies---------------------------"
    );
    const { stdout: stdout2Point5, stderr: stderror2Point5 } = await execPromisified(
      "yarn install --production=true",
      { cwd }
    );
    response.logs.push(stdout2Point5);
    response.errors.push(stderror2Point5);

    response.logs.push(
      "---------------------------Apply latest migrations---------------------------"
    );
    const { stdout: stdout4, stderr: stderror4 } = await execPromisified(
      "npx blitz prisma migrate deploy",
      { cwd }
    );
    response.logs.push(stdout4);
    response.errors.push(stderror4);

    response.logs.push("---------------------------Restart PM2 process---------------------------");
    const { stdout: stdout5, stderr: stderror5 } = await execPromisified("pm2 restart blitz");
    response.logs.push(stdout5);
    response.errors.push(stderror5);

    res.status(200).json(response);
  } catch (e) {
    response.statusCode = 500;
    response.logs.push("CI failed");
    response.errors.push(e.message);
    res.status(response.statusCode).json(response);
  }
});
