const getEnvVar = (envVarName: string) => {
  const envVar = process.env[envVarName];

  if (!envVar) throw new Error(`${envVarName} is not defined`);

  return envVar;
};

export const getGithubClientId = () => getEnvVar("GITHUB_CLIENT_ID");
export const getGithubClientSecret = () => getEnvVar("GITHUB_CLIENT_SECRET");
export const getNextAuthSecret = () => getEnvVar("NEXTAUTH_SECRET");
export const getAdminEmail = () => getEnvVar("ADMIN_EMAIL");
export const getAwsSecretKey = () => getEnvVar("AWS_SECRET_KEY");
export const getAwsAccessKeyId = () => getEnvVar("AWS_KEY_ID");
export const getAwsBucketName = () => getEnvVar("AWS_BUCKET_NAME");
export const getSendgridApiKey = () => getEnvVar("SENDGRID_API_KEY");
