import { api } from "src/blitz-server";
import { exec } from "child_process";

export default api(async (req, res, ctx) => {
  const { secret } = req.body;

  const response = {
    statusCode: 200,
    msg: "CI successfully completed",
  };

  if (secret !== process.env.CI_SECRET) {
    response.statusCode = 401;
    response.msg = "CI errored";
  }

  if (response.statusCode !== 401) {
    exec(
      `git clone git@github.com:${process.env.TF_VAR_github_username}/${process.env.TF_VAR_github_repository}.git /home/ubuntu/app`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        exec(`npx blitz prisma migrate deploy`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).json({ msg: "Failed to run migrations" });
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);

          res.status(200).json(response);
        });
      }
    );
  }

  res.status(response.statusCode).json(response);
});
