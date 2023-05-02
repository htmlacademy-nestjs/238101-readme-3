export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
