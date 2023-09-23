import { api } from "src/blitz-server";
import { exec } from "child_process";
import util from "util";

const execPromisified = util.promisify(exec);

export default api(async (req, res, ctx) => {
  const { secret } = req.body;

  const response = {
    statusCode: 200,
    msg: "CI successfully completed",
    error: "",
  };

  if (secret !== process.env.CI_SECRET) {
    response.statusCode = 401;
    response.msg = "CI errored";
    return res.status(response.statusCode).json(response);
  }

  try {
    const { stdout: stdout1, stderr: stderror1 } = await execPromisified(
      `git clone git@github.com:${process.env.TF_VAR_github_username}/${process.env.TF_VAR_github_repository}.git /home/ubuntu/app`
    );
    // console.log(`stdout: ${stdout1}`);
    // console.log(`stderr: ${stderror1}`);

    response.msg += stdout1 + "\n";
    response.error += stderror1 + "\n";

    const { stdout: stdout2, stderr: stderror2 } = await execPromisified("yarn");
    // console.log(`stdout: ${stdout2}`);
    // console.log(`stderr: ${stderror2}`);

    response.msg += stdout2 + "\n";
    response.error += stderror2 + "\n";

    const { stdout: stdout3, stderr: stderror3 } = await execPromisified("yarn build");
    // console.log(`stdout: ${stdout3}`);
    // console.log(`stderr: ${stderror3}`);
    response.msg += stdout3 + "\n";
    response.error += stderror3 + "\n";

    const { stdout: stdout4, stderr: stderror4 } = await execPromisified(
      "npx blitz prisma migrate deploy"
    );
    // console.log(`stdout: ${stdout4}`);
    // console.log(`stderr: ${stderror4}`);

    response.msg += stdout4 + "\n";
    response.error += stderror4 + "\n";

    const { stdout: stdout5, stderr: stderror5 } = await execPromisified("pm2 restart blitz");
    // console.log(`stdout: ${stdout5}`);
    // console.log(`stderr: ${stderror5}`);

    response.msg += stdout5 + "\n";
    response.error += stderror5 + "\n";

    res.status(200).json({ msg: "CI completed successully" });
  } catch (e) {
    res.status(500).json({ msg: "CI failed", error: e.message });
  }
});
