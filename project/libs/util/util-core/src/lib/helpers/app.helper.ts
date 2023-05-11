export const getAppRunningString = (port: number | string, prefix: string) =>
  `🚀 Application is running on: http://localhost:${port}/${prefix}`;

export const getAppModeString = (mode: string) => `🎯  Current mode: ${mode}`;
